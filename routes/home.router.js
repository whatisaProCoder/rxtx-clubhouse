const { Router } = require("express");

const homeController = require("../controllers/home.controller");

const homeRouter = Router();

homeRouter.get("/", homeController.homePageGet);

module.exports = homeRouter;