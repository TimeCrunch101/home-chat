const {spawn} = require("child_process")


const wsServer = spawn("node",["./socketServer/socket.js"], {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  })

wsServer.on("message", (data) => {
    console.log(data)
})