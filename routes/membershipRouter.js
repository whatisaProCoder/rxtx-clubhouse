const { Router } = require("express");

const membershipController = require("../controllers/membershipController");

const membershipRouter = Router();

membershipRouter.get("/code", membershipController.membershipPageGet);

module.exports = membershipRouter;