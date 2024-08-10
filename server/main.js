const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.sendStatus(200)
    console.log("Got a request")
})

app.listen(8080, console.log('API: http://localhost:8080'))