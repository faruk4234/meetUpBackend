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
  const {token,sendId}=req.body
  const sourceId=jwt_decode(token).userid

  

}))

module.exports=router