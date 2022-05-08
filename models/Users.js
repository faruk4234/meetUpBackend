const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    minlength:6
  },

  picture: {
    type: String,
    required: false,
  },

  status:{
    type:Boolean,
    required:false,
    default:false
  },
  friends:{
    type:Array,
    required:false,
    default:[]
  }
})

module.exports = mongoose.model('register', userSchema)
