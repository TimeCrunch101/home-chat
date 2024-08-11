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
});

io.listen(3000);