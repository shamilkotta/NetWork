const { checkSchema } = require("express-validator");

const signupSchema = {
  name: {
    trim: true,
    notEmpty: true,
    errorMessage: "Enter your name",
  },
  email: {
    trim: true,
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Enter a valid email",
  },
  tag: {
    trim: true,
    notEmpty: true,
    errorMessage: "Enter your tag line",
    isLength: {
      errorMessage: "Tag line can only be up to 75 characters long",
      options: { max: 75 },
    },
  },
  social: {
    trim: true,
    notEmpty: true,
    isURL: {
      errorMessage: "Enter a valid social media url",
      options: {
        protocols: ["https"],
        require_protocol: true,
        require_valid_protocol: true,
      },
    },
    errorMessage: "Enter your social media url",
  },
  bio: {
    trim: true,
    notEmpty: true,
    isLength: {
      errorMessage: "Bio contain atleast 150 characters",
      options: { min: 150 },
    },
    errorMessage: "Enter about you (atleast 150 characters)",
  },
  password: {
    trim: true,
    notEmpty: true,
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
  confirmPassword: {
    trim: true,
    notEmpty: true,
    custom: {
      errorMessage: "Passwords didn't match",
      options: (value, { req }) => value === req.body.password,
    },
    errorMessage: "Confirm password cannot be empty",
  },
};

module.exports = checkSchema(signupSchema);
