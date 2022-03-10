var express = require('express')
var router = express.Router()
const socketIO = require('socket.io')
const io = socketIO(1234)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı: ' + socket.id)

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı: ' + socket.id)
  })
})



module.exports = router
