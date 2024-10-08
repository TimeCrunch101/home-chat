if (process.env.NODE_ENV !== "production") require('dotenv').config()
console.info(process.env.NODE_ENV)
const express = require("express")
const app = express()
const initGetRouter = require("./router/getRouter")
const initPostRouter = require("./router/postRouter")
initGetRouter(app)
initPostRouter(app)

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  require("./controllers/socketController")
  app.listen(8080, console.log("API: http://localhost:8080"))
}
