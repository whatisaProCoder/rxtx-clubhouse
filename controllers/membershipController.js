const db = require("../db/queries");

exports.membershipPageGet = (req, res) => {
  if (req.user.is_member) {
    return res.redirect("/");
  }
  res.render("membership");
}

const { body, validationResult, matchedData } = require("express-validator");

const validateCode = [
  body("code")
    .trim()
    .notEmpty().withMessage("Code is empty")
    .custom((value) => value == process.env.MEMBER_CODE)
    .withMessage("Incorrect Code")
]

exports.membershipCodePost = [
  validateCode,
  async (req, res, next) => {
    if (req.user.is_member) {
      return res.redirect("/");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("membership", { errors: errors.array() });
    }

    try {
      await db.makeUserMember(req.user.id);
    } catch (error) {
      next(error);
    }

    res.redirect("/");
  }
]