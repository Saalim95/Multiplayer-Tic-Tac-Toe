var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server)

server.listen(3000)
console.log('listening at 3000')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'statics/basic.html');
  });

io.on('connection', (socket)=>{
  console.log('connected')
  const msg = 'Good Morning!!'
  socket.emit('greeting', msg)
  socket.on('disconnect', ()=>{
    console.log('user disconnected')
  })
})
