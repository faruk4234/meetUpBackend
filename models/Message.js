const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  message_id:Schema.Types.ObjectId,

  message:{
    type:String,
    maxlength:2000,
    minlength:1,
  },

  sendid:{
    type:String,
    required:true
  },

  sourceid:{
    type:String,
    required:true
  },

  sendTime:{
    type:String
  },

})

module.exports=mongoose.model('messages',messageSchema)