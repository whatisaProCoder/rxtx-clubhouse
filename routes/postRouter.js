const { Router } = require("express");

const postController = require("../controllers/postController");

const postRouter = Router();

postRouter.get("/new", postController.newPostGet);

postRouter.post("/new", postController.newPostPost);

module.exports = postRouter;