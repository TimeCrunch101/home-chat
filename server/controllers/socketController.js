const {spawn} = require("child_process")
const dbController = require("./dbController")


const wsServer = spawn("node",["./socketServer/socket.js"], {
    stdio: ["inherit", "inherit", "inherit", "ipc"]
  })

const logIt = (data) => {
  if (process.env.NODE_ENV === "development") {
    console.log(data)
  }
}

wsServer.on("message", (data) => {
  switch (data.event) {
    case "log message":
      logIt(data)
      dbController.logSocketEvent(data)
      break;
  
    default:
      logIt(data)
      break;
  }
})