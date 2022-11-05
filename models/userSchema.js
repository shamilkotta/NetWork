const { getDb } = require("../config/db");
const { USERS_COLLECTION } = require("../utils/constants");

module.exports =
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    let collections = await getDb
      .listCollections({}, { nameOnly: true })
      .toArray();
    collections = collections.map((ele) => ele.name);
    if (collections.includes(USERS_COLLECTION)) resolve();
    else
      getDb
        .createCollection(USERS_COLLECTION, {
          validator: {
            $jsonSchema: {
              bsonType: "object",
              title: "User object validation",
              required: ["email", "password"],
              properties: {
                name: {
                  bsonType: "string",
                  description: "name is required",
                },
                email: {
                  bsonType: "string",
                  description: "email is required",
                },
                tag: {
                  bsonType: "string",
                  description: "tag line is required",
                },
                social: {
                  bsonType: "string",
                  description: "social media url is required",
                },
                bio: {
                  bsonType: "string",
                  description: "bio is required",
                },
                password: {
                  bsonType: "string",
                  description: "password is required",
                },
              },
            },
          },
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
  });
