const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http=require('http')


const usersRouter = require('./routes/users')
const messageRouter = require('./routes/message')


//midleware
const verify_token= require('./middleware/verify-token')

const config =require('./config')
const app = express()

// Create the http server
const server = http.createServer(app)
let io=require('socket.io')(server)

//mongo db connection
const db = require('./helper/db')
db()

let onlineUsers = {}

//socket io 
const mySocket=require('./socket')
mySocket(io,onlineUsers)

// view engine setup
app.set('api_secret_key', config.api_secret_key)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.set('io', io)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', usersRouter) //user routes
app.use('/verify',verify_token) // middlewware token
app.use('/message',messageRouter) //message routes

//using for socket io app use
app.use(function(req, res, next){
  res.io = io
  next()
})
 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = {app:app, server:server}
