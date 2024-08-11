const express = require("express")
const getRouter = express.Router()
const getController = require("../controllers/getController")


const initGetRouter = (app) => {

    getRouter.get("/test", getController.test)

    return app.use('/', getRouter)
}


module.exports = initGetRouter