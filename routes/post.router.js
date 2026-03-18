const { Router } = require("express");

const postController = require("../controllers/post.controller");

const postRouter = Router();

postRouter.get("/new", postController.newPostGet);

postRouter.post("/new", postController.newPostPost);

postRouter.get("/delete/:id", postController.deletePostGet);

module.exports = postRouter;