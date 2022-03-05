const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({

  group_id:Schema.Types.ObjectId,

  groupName:{
    type:String,
    required:true,
    unique:true
  },

  groupImage:{
    type:String,
    required:false
  },

  groupMembers:{
    type:Array
  },

  groupMesaages:{
    type:Array,
  }


})

module.exports = mongoose.model('group',GroupSchema)