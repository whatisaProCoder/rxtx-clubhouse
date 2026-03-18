const db = require("../db/queries");

exports.homePageGet = async (req, res, next) => {
  let posts = null;

  try {
    posts = await db.getAllPosts();
  } catch (error) {
    next(error);
  }

  res.render("index", { posts: posts });
}