const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const Users= require('../models/Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})


//use for register 
router.post('/register', (req, res) => {
  const register = req.body

  bycrypt.hash(register.password,10).then((hash)=>{
    const user=new Users({
      ...register,
      password:hash
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
          const payload={
            email,
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





module.exports = router
