const express = require('express')
const router = express.Router()

const message = require('../models/Message')

//send message
router.post('/sendMessage',(req,res)=>{
  const messageData = req.body
    
  const sendMessage = new message({
    ...messageData
  })

  const promise = sendMessage.save()

  promise
    .then((data)=>{
      res.json(data)
    })
    .catch((err)=>{
      res.json(err)
    })

})


//get message but you have to send your id and id message with you
router.get('/getMessage',(req,res)=>{
  const {sendid,sourceid}=req.body

  const promise=message.find({sendid:{ $in: [ sendid, sourceid ]} , sourceid:{ $in: [ sendid, sourceid ]}})
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=> {throw err})

})

module.exports= router