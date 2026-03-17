const { Router } = require("express");

const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/sign-up", authController.signUpPageGet);

authRouter.post("/sign-up", authController.signUpPagePost);

authRouter.get("/log-in", authController.loginPageGet);

authRouter.post("/log-in", authController.loginPagePost);

authRouter.get("/log-out", authController.logOutGet);

module.exports = authRouter;