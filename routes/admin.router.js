const { Router } = require("express");

const adminController = require("../controllers/admin.controller");

const adminRouter = Router();

adminRouter.get("/code", adminController.adminCodeGet);

adminRouter.post("/code", adminController.adminCodePost)

module.exports = adminRouter;