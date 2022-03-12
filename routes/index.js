var express = require('express')
var router = express.Router()
const socketIO = require('socket.io')
const io = socketIO(1234)
/* GET home page. */
router.get('/socket', function(req, res, next) {
  req.io.emit('socket', console.log('sdsa'))
  res.send('express and socket connect with succes')
})

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı: ' + socket.id)

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı: ' + socket.id)
  })
})

module.exports = router
