const express = require("express")
const app = express()
const port = 3000
var turtles = new Map()
var { Turtle, Position, BoundingBox } = require("./util/classes.js")

/**
 * @type {Array<BoundingBox>}
 */
var unsafeBoxes = new Array()


app.get("/initialize", (req, res) => {
	var turtleID = req.query.turtleID
	var position = req.query.position.split("~")
	var rotation = req.query.rotation

	var turtle = new Turtle(turtleID, new Position(position[0], position[1], position[2]), rotation)
    turtles.set(turtleID, turtle)
    console.log("initialized turtle " + turtleID)
    res.send()
})

app.get("/instructions", (req, res) => {})
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
