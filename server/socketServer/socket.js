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
  
  // TODO: Log in server when a user connects, use process.send() in production
  console.log(`Socket ID: ${socket.id}, Username: ${socket.username} - Connected`)


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
    // TODO: Log in server, use process.send() in production
    console.log(`Socket ID: ${socket.id}, Username: ${socket.username} Joined Room: ${roomNum}`)
  })

  socket.on("room-msg", (msgData) => {
    socket.to(msgData.room).emit("room-emit",msgData)
  })

  socket.on("disconnect", (reason) => {
    // TODO: Log in server, use process.send() in production
    console.log(`UserID: ${socket.id}, UserName: ${socket.username}, Disconnected Because: ${reason}`)
  })
  
});


io.listen(3000);
// FIXME: use process.send() in production