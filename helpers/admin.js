const { USERS_COLLECTION } = require("../utils/constants");
const { getDb } = require("../config/db");

module.exports = {
  getAllUsers: () =>
    new Promise((resolve, reject) => {
      getDb
        .collection(USERS_COLLECTION)
        .find({})
        .toArray()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }),

  updateStatus: (id, status) =>
    new Promise((resolve, reject) => {
      getDb
        .collection(USERS_COLLECTION)
        .updateOne({ _id: id }, { $set: { status } })
        .then((res) => resolve({ success: true, response: res }))
        .catch((err) => reject(err));
    }),

  deleteUser: (id) =>
    new Promise((resolve, reject) => {
      getDb
        .collection(USERS_COLLECTION)
        .deleteOne({ _id: id, admin: { $ne: true } })
        .then(() => resolve({ success: true }))
        .catch((err) => reject(err));
    }),
};
