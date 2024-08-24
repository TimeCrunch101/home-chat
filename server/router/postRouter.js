const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/postController")


const initPostRouter = (app) => {

    postRouter.post("/api/create/room", postController.test)

    return app.use('/', postRouter)
}


module.exports = initPostRouter