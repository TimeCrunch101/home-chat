const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.on("send-msg", (data) => {
    socket.broadcast.emit("server-send-msg", data)
  })
  socket.on("join-room", (roomNum) => {    
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room)
      }
    });
    socket.join(roomNum)
  })
  socket.on("room-msg", (msgData) => {
    socket.to(msgData.room).emit("room-emit",msgData)
  })
});

io.listen(3000);
process.send("WS: http://localhost:3000")