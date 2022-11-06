const { checkSchema } = require("express-validator");

const loginSchema = {
  email: {
    trim: true,
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Enter a valid email",
  },
  password: {
    trim: true,
    notEmpty: true,
    custom: {
      errorMessage: "Password cannot contain whitespaces",
      options: (value) => !/\s/g.test(value),
    },
    errorMessage: "Password cannot be empty",
  },
};

module.exports = checkSchema(loginSchema);
