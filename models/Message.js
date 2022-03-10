const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  message_id:Schema.Types.ObjectId,

  message:{
    type:String,
    maxlength:2000
  },

  message_sendid:{
    type:String,
    required:true
  },

  message_sourceid:{
    type:String,
    required:true
  },

  message_sendTime:{
    type:String
  },
  time:{
    type:String,

  }
})

module.exports=mongoose.model('messages',messageSchema)