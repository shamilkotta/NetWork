const { checkSchema } = require("express-validator");

const lgoinSchema = {
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
    normalizeEmail: true,
    errorMessage: "Enter a valid email",
  },
  password: {
    notEmpty: true,
    trim: true,
    isStrongPassword: {
      errorMessage:
        "Password must contain at least one uppercase, one lowercase, one number, and one special character",
    },
    isLength: {
      errorMessage: "Password can only be up to 16 characters long",
      options: { max: 16 },
    },
    custom: {
      errorMessage: "Password cannot contain whitespaces",
      options: (value) => !/\s/g.test(value),
    },
    errorMessage: "Password cannot be empty",
  },
};

module.exports = checkSchema(lgoinSchema);
