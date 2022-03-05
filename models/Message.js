const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const messageSchema = new Schema({
  message_id:Schema.Types.ObjectId,

  message:{
    type:String,
    maxlength:2000
  },

  message_sendid:{
    type:String
  },

  message_sourceid:{
    type:String,
  },

  message_sendTime:{
    type:String
  },
  time:{
    type:String,

  }
})

module.exports=mongoose.model('messages',messageSchema)