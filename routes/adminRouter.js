const { Router } = require("express");

const adminController = require("../controllers/adminController");

const adminRouter = Router();

adminRouter.get("/code", adminController.adminCodeGet);

module.exports = adminRouter;