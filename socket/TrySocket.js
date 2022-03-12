
module.exports=(io)=>{
  io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı: ' + socket.id)

    socket.on('disconnect', () => {
      console.log('Bir kullanıcı ayrıldı: ' + socket.id)
    })
  })

}