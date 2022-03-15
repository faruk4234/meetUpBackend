
module.exports=(io,onlineUsers)=>{

  io.on('connection', (socket) => {
    const id= socket.handshake.headers.data
    onlineUsers[socket.id] = id
    console.log(onlineUsers)
    console.log('Bir kullanıcı bağlandı: ' + socket.id)

    socket.on('disconnect', () => {
      console.log('Bir kullanıcı ayrıldı: ' + socket.id)
      delete onlineUsers[socket.userId]
    })

    //this is for sending
    socket.emit('hello', 'worldsdssdsd')

    //this is for listen statiton
    socket.on('echo', function (data) {
      console.log(data)
      socket.emit('echo', data)
    })
  })

  

}