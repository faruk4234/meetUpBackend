const express = require('express')
const router = express.Router()

const group = require('../models/Groups')

router.post('/createGroup',(req,res)=>{

  const groupItems = req.body

  const promise = new group({
    ...groupItems
  })

  promise
    .then((data)=>{
      res.json(data)
    })
    .catch((err)=>{
      res.json(err)
    })

})

module.exports = router