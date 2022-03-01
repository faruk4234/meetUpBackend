const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const Users= require('../models/Users')
const upload=require('../helper/imageWriter')
const jwt_decode=require('jwt-decode')
const fs=require('fs')
/* GET users listing. */
router.get('/', function (req, res) {
  Users.find({},(err,user)=>{
    res.json(user)
  })
})


//use for register 
router.post('/register',upload.single('picture'), (req, res) => {
  const register = req.body

  bycrypt.hash(register.password,20).then((hash)=>{
    const user=new Users({
      ...register,
      password:hash,
      picture:req.file.path,
    })

    const promise = user.save()

    promise
      .then((data)=>{
        res.json(data)
      })
      .catch((err)=>{
        res.json(err)
      })
  })
})


//use for login
router.post('/login',(req,res)=>{
  const {email,password} =req.body

  Users.findOne({email},(err,user)=>{
    if(err) throw err

    if(!user){
      res.json({
        status:false,
        message:'Autantication faild, user not found'
      })
    } else {
      bycrypt.compare(password, user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:'Autantication failed, wrong password'
          })
        }else {
          const userid = user._id
          const payload={
            userid,
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn:7200
          })
          res.send({
            status: true,
            token,
          })
        }
      })
    }
  })
})

router.put('/update', upload.single('picture'),(req,res,next)=>{
  const update = req.body
  console.log(update)
  const userid=jwt_decode(update.token).userid

  
  const promise = Users.findByIdAndUpdate(
    userid,
    { $set: { ...update } },
    {
      new: true,
    }
  )
    
  //crypt password and update
  if(update.password){
    bycrypt.hash(update.password,20).then((hash)=>{
      Users.findByIdAndUpdate(userid,
        {
          $set:{password:hash} },
        {
          new:true
        })
    })
  }

  //update picture
  if(update.picture){

    //
  }

  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})



module.exports = router
