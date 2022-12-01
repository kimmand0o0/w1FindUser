const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ID: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    }
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
