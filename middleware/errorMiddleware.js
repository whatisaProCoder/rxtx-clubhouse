const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).render("error-page", { message: err.message });
}

module.exports = errorMiddleware;