const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const Users= require('../models/Users')
const upload=require('../helper/imageWriter')
const jwt_decode=require('jwt-decode')
const fs=require('fs')

router.post('/send',(req,res)=>{
    
})