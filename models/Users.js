const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: Schema.Types.ObjectId,

  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  picture: {
    type: Image,
    required: false,
  },
});

module.exports = mongoose.model("register", userSchema);
