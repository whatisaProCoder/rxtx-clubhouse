const { Router } = require("express");

const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/sign-up", authController.signUpPageGet);

authRouter.get("/log-in", authController.loginPageGet);

module.exports = authRouter;