const express = require("express")
const app = express()
const initGetRouter = require("./router/getRouter")
initGetRouter(app)
const {spawn} = require("child_process")

const wsServer = spawn("node",["./socket.js"])

wsServer.stdout.on("data", (data) => {
  console.log(data.toString())
})

// TODO: Listen for socket server errors


app.listen(8080, console.log("API: http://localhost:8080"))