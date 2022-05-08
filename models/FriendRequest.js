const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendRequest = new Schema({

  requestId:Schema.Types.ObjectId,

  sendId:{
    type:String,
    required:true
  },

  sourceId:{
    type:String,
    required:true
  }

})

module.exports=mongoose.model('FriendRequest',FriendRequest)