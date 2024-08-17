const {spawn} = require("child_process")
const dbController = require("./dbController")


const wsServer = spawn("node",["./socketServer/socket.js"], {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  })

wsServer.on("message", (data) => {
  switch (data.event) {
    case "log message":
      dbController.logSocketEvent(data)
      break;
  
    default:
      break;
  }
})