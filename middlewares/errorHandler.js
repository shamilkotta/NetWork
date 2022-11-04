module.exports = (err, req, res, next) => {
  let statusCode;
  if (err.message === "Not found") statusCode = 404;
  res.status(statusCode).send(err);
  next();
};
