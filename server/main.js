const express = require("express")
const app = express()
const initGetRouter = require("./router/getRouter")
initGetRouter(app)
const {spawn} = require("child_process")

if (process.env.NODE_ENV === "production") {
  console.info("PRODUCTION ENV")
  const wsServer = spawn("node",["./socket.js"])
  
  wsServer.stdout.on("data", (data) => {
    console.log(data.toString())
  })
  
  wsServer.stderr.on("data", (data) => {
    console.error("WS Error: ", data.toString())
  })
  
  wsServer.on("close", (code) => {
    console.info("WS Process Closed: ", code)
  })
  
  app.listen(8080, console.log("API: http://localhost:8080"))
} else {
  console.info("DEVELOPMENT ENV")
}
