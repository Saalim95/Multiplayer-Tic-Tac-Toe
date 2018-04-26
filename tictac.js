var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server)

server.listen(3000)
console.log('Listening...')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/' + 'statics/tictac.html')
})

class Player{
    constructor(name, id){
      this.name = name
      this.id = id
    }
  }

var player_list = []
var table = {}

io.on('connection', (socket)=>{
    console.log('A User connected!')
    if (player_list.length===0){
        var P1 = new Player("Player 1", socket.id, "1")
        player_list.push(P1)
    }
    else{
        var P2 = new Player("Player 2", socket.id, "2")
        player_list.push(P2)
        //assignSign()
    }
    socket.on('disconnect', ()=>{
        console.log('someone disconnected')
    })
    socket.on('keypress', (obj)=>{
        //handleSign(obj, socket.id, io)
        let sign = null
        if (player_list[0].id===socket.id){
            sign = "0"
        }
        else if(player_list[1].id===socket.id){
            sign = "X"
        }

        else{
            sign = "NULL"
        }
        //player_list[0].id===socket.id?sign="O":sign="X"
        io.sockets.emit("renderCell", {id: obj.cell, sign: sign})
    })
})

//io.sockets.emit will send to all the clients
//socket.broadcast.emit will send the message to all the other clients except the newly created connection

handleSign = (obj, id, io) =>{
    io.sockets.emit("renderCell", {cell: obj.cell, sign: "X"})
}
