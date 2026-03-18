const db = require("../db/queries");

exports.adminCodeGet = (req, res) => {
  if (req.user.is_admin) {
    return res.redirect("/");
  }
  res.render("become-admin");
}

const { body, validationResult, matchedData } = require("express-validator");

const validateCode = [
  body("code")
    .trim()
    .notEmpty().withMessage("Code is empty")
    .custom((value) => value == process.env.ADMIN_CODE)
    .withMessage("Incorrect Code")
]


exports.adminCodePost = [
  validateCode,
  async (req, res, next) => {
    if (req.user.is_admin) {
      return res.redirect("/");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("become-admin", { errors: errors.array() });
    }

    try {
      await db.makeUserAdmin(req.user.id);
    } catch (error) {
      next(error);
    }

    res.redirect("/");
  }
]