const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use((socket, next) => {
  const username = socket.handshake.auth.name;
  if (!username || username.length <= 2) {
    return next(new Error("Invalid Username"))
  }
  socket.username = username;
  next()
})

io.on("connection", (socket) => {
  
  process.send({
    event: "log message",
    message: `Socket ID: ${socket.id}, Username: ${socket.username} - Connected`,
    log_level: "info"
  })


  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  // Get List of Users
  socket.emit("users", users);

  // Notify All Users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username
  })

  socket.on("join-room", (roomNum) => {    
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room)
      }
    });
    socket.join(roomNum)
    process.send({
      event: "log message",
      message: `Socket ID: ${socket.id}, Username: ${socket.username} Joined Room: ${roomNum}`,
      log_level: "info"
    })
  })

  socket.on("room-msg", (msgData) => {
    socket.to(msgData.room).emit("room-emit",msgData)
  })

  socket.on("disconnect", (reason) => {
    socket.broadcast.emit("user disconnected", (socket.id))
    process.send({
      event: "log message",
      message: `UserID: ${socket.id}, UserName: ${socket.username}, Disconnected Because: ${reason}`,
      log_level: "info"
    })
  })
  
});


io.listen(3000);
process.send("WS: http://localhost:3000")