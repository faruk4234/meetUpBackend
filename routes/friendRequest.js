const { response, request } = require('express')
const express = require('express')
const router = express.Router()
const jwt_decode=require('jwt-decode')

const FriendsRequest = require('../models/FriendRequest')
const Users = require('../models/Users')

router.post('/sendRequest',(req,res)=>{
  const request =new FriendsRequest({
    ...req.body
  })

  const promise =request.save()

  promise
    .then((data)=>{
      res.json(data)})
    .catch((err)=>{
      res.json(err)
    })
})

router.post('/getMyRequest',(req,res)=>{
  //const sourceId=jwt_decode(req.body.token).userid
  const {sourceId} =req.body
  const promise = FriendsRequest.find({ sendId : sourceId})
 
  promise
    .then((data)=>{
      res.json(data)})
    .catch((err)=>{
      res.json(err)
    })
})

router.post('/getSendRequest',(req,res)=>{
  //const sourceId=jwt_decode(req.body.token).userid
  const {sendId} =req.body
  const promise = FriendsRequest.find({ sourceId : sendId})
 
  promise
    .then((data)=>{
      res.json(data)})
    .catch((err)=>{
      res.json(err)
    })
})

router.post('/getRequest',(req,res)=>{
  //const sourceId=jwt_decode(req.body.token).userid
  const sourceId =req.body.sourceId
  const promise = FriendsRequest.find({sourceId:sourceId})
 
  promise
    .then((data)=>{
      res.json(data)})
    .catch((err)=>{
      res.json(err)
    })
})

router.post('/acceptRequest',((req,res)=>{
  const {requestId}=req.body
  //const sourceId=jwt_decode(token).userid

  // const request = FriendsRequest.find({request_id:requestId})
  const promise = FriendsRequest.findById(requestId)
 
  promise
    .then((data)=>{
      const {sendId,sourceId} = data
      Users.findByIdAndUpdate(sendId,
        { $push: { friends: sourceId} },
        function (error, success) {
          if (error) {
            console.log(error)
          } else {
            console.log(success)
          }
        })
      

      Users.findByIdAndUpdate(sourceId,
        { $push: { friends: sendId} },
        function (error, success) {
          if (error) {
            console.log(error)
          } else {
            console.log(success)
          }
        })

      FriendsRequest.findByIdAndDelete(requestId, function (err, docs) {
        if (err){
          console.log(err)
        }
        else{
          console.log('Deleted : ', docs)
        }
      })
      res.json(data)
    })
    .catch((err)=>{
      res.json(err)
    })

}))

module.exports=router

//user.friends==[...user.friends+(sendId===user.user_id)?sendId:sourceId ,response.json(user)]

