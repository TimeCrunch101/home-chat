console.info(process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") require('dotenv').config()
const express = require("express")
const app = express()
require("./controllers/socketController")
const initGetRouter = require("./router/getRouter")
const initPostRouter = require("./router/postRouter")
initGetRouter(app)
initPostRouter(app)

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "dev") {
  app.listen(8080, console.log("API: http://localhost:8080"))
}
