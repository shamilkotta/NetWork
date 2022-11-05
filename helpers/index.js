const bcrypt = require("bcrypt");

const { USERS_COLLECTION } = require("../utils/constants");
const { getDb } = require("../config/db");

module.exports = {
  signupHelper: (data) =>
    new Promise((resolve, reject) => {
      const { name, email, tag, social, bio, password } = data;
      getDb
        .collection(USERS_COLLECTION)
        .findOne({ email })
        .then((user) => {
          if (user)
            resolve({
              success: false,
              message: "User already exist, try login",
            });
          else {
            const salt = Number(process.env.SALT) || 10;
            bcrypt
              .hash(password, salt)
              .then((newPass) => {
                getDb
                  .collection(USERS_COLLECTION)
                  .insertOne({
                    name,
                    email,
                    tag,
                    social,
                    bio,
                    password: newPass,
                  })
                  .then(() => {
                    resolve({
                      success: true,
                      message: "User created successfully",
                    });
                  });
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    }),
};
