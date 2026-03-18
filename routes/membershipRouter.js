const { Router } = require("express");

const membershipController = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.get("/code", membershipController.membershipPageGet);

membershipRouter.post("/code", membershipController.membershipCodePost);

module.exports = membershipRouter;