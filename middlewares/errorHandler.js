/* eslint-disable prefer-const */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let { statusCode = 500, message = "Somthing went wrong" } = err;

  if (statusCode === 404) {
    message = "Not found";
    res.redirect("/404");
  }
  if (statusCode === 401) {
    message = "Unauthorized";
  }
  res.status(statusCode).json({ success: false, statusCode, message });
};
