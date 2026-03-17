const passport = require("passport");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const { body, validationResult, matchedData } = require("express-validator");

const cannotBeEmpty = "cannot be empty";
const maxChars = (maxLength) => `must be within ${maxLength} characters`;


const validateUserSignUp = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name " + cannotBeEmpty)
    .isLength({ max: 100 }).withMessage("First name " + maxChars(100)),
  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name " + cannotBeEmpty)
    .isLength({ max: 100 }).withMessage("Last name " + maxChars(100)),
  body("email")
    .trim()
    .notEmpty().withMessage("E-Mail " + cannotBeEmpty)
    .isEmail().withMessage("E-Mail is not valid")
    .isLength({ max: 255 }).withMessage("E-mail " + maxChars(255))
    .custom(async value => {
      const user = await db.getUserUsingEmail(value);
      if (user) {
        throw new Error("E-Mail already in use")
      }
    }),
  body("password")
    .trim()
    .notEmpty().withMessage("Password field " + cannotBeEmpty)
    .isLength({ max: 255 }).withMessage("Password " + maxChars(255)),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value == req.body.password)
    .withMessage("Passwords don't match")
]

exports.signUpPageGet = (req, res) => {
  res.render("sign-up", { oldData: {} });
}

exports.signUpPagePost = [
  validateUserSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(
        "sign-up",
        {
          errors: errors.array(),
          oldData: req.body
        }
      )
    }

    const { firstName, lastName, email, password } = matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await db.addUser({ firstName, lastName, email, hashedPassword });
    } catch (error) {
      next(error);
    }

    res.redirect("/auth/log-in");
  }
]

exports.loginPageGet = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("log-in", { oldData: {} });
}

exports.loginPagePost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("log-in", {
        errors: [{ msg: info.message }],
        oldData: { email: req.body.email }
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  })
}