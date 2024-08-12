const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id)

  socket.on("send-msg", (data) => {
    console.log(`Server got msg: ${data}`)
    socket.broadcast.emit("server-send-msg", data)
  })

  socket.on("join-room", (roomNum) => {    
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room)
      }
    });
    socket.join(roomNum)
    console.log("Rooms: ", socket.rooms)
  })

  socket.on("room-msg", (msgData) => {
    socket.to(msgData.room).emit("room-emit",msgData.msg)
  })
  
});

io.listen(3000, console.log("WS: http://localhost:3000"));