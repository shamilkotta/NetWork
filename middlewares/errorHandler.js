// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let statusCode = 500;
  if (err.message === "Not found") statusCode = 404;
  res.status(statusCode).render("404");
};
