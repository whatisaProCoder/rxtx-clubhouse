const db = require("../db/queries");

const { isAdmin } = require("../middleware/auth.middleware");

const { body, validationResult, matchedData } = require("express-validator");

const validatePost = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title cannot be empty")
    .isLength({ min: 10, max: 50 }).withMessage("Title must be within 10 to 50 characters"),
  body("body")
    .trim()
    .notEmpty().withMessage("Body cannot be empty")
    .isLength({ min: 25, max: 500 }).withMessage("Body must be within 25 to 500 characters"),
]

exports.newPostGet = (req, res) => {
  res.render("new-post", { oldData: {} });
}

exports.newPostPost = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-post", { errors: errors.array(), oldData: req.body });
    }

    const { title, body } = matchedData(req);

    try {
      await db.addPost({ used_id: req.user.id, title, body });
    } catch (error) {
      next(error);
    }

    res.redirect("/");
  }
]

exports.deletePostGet = [
  isAdmin,
  async (req, res, next) => {
    const postID = req.params.id;

    try {
      await db.deletePost({ id: postID });
    } catch (error) {
      next(error);
    }

    res.redirect("/");
  }
]