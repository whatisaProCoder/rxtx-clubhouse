const db = require("../db/queries");

const { body, validationResult, matchedData } = require("express-validator");

const validatePost = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title cannot be empty")
    .isLength({ min: 10, max: 50 }).withMessage("Title must be within 10 to 50 characters"),
  body("body")
    .trim()
    .notEmpty().withMessage("Body cannot be empty")
    .isLength({ min: 25, max: 255 }).withMessage("Body must be within 25 to 255 characters"),
]

exports.newPostGet = (req, res) => {
  res.render("new-post");
}

exports.newPostPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-post", { errors: errors.array() });
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