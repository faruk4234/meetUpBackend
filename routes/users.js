const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const Users= require('../models/Users')
const upload=require('../helper/imageWriter')
const jwt_decode=require('jwt-decode')
const fs=require('fs')
const { token } = require('morgan')


/* GET users listing. */
router.get('/', function (req, res) {
  Users.find({},(err,user)=>{
    res.json(user)
  })
})



//use for register 
router.post('/register',upload.single('picture'), (req, res) => {
  const register = req.body

  bycrypt.hash(register.password,10).then((hash)=>{
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



//update all user information route
router.put('/update', upload.single('picture'),async (req,res)=>{
  let update = req.body
  const userid=jwt_decode(update.token).userid

  //use profile picture update and delete old one
  if(req.file){
    update.picture=req.file.path 
    Users.findOne({userid},(err,user)=>{
      fs.unlinkSync(user.picture)
    })
  }

  //use update password and crypt it
  if(update.password)
  {
    await bycrypt.hash(update.password,10).then((password)=>{
      update.password=password
    })
  }


  const promise = Users.findByIdAndUpdate(
    userid,
    {
      $set: { ...update } },
    {
      new: true,
    }
  )

  promise
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})



// delete profile photos
router.delete('/deleteProfilePhoto/:token',()=>{
  const userid=jwt_decode(token).userid

  Users.findOne({userid},(err,user)=>{
    fs.unlinkSync(user.picture)
  })

})


module.exports = router
