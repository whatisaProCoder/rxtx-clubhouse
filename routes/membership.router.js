const { Router } = require("express");

const membershipController = require("../controllers/membership.controller");

const membershipRouter = Router();

membershipRouter.get("/code", membershipController.membershipPageGet);

membershipRouter.post("/code", membershipController.membershipCodePost);

module.exports = membershipRouter;