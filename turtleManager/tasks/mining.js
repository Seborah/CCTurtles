const { Turtle, Position, MiningTask, BoundingBox } = require("../util/classes.js")

/**
 *
 * @param {Turtle} turtle
 * @param {number} sizeX
 * @param {number} sizeY
 * @param {number} sizeZ
 * @param {Array<BoundingBox>} unsafeBoxes
 *  @returns {boolean} true if the turtle is safe to mine in, false if it is not
 */
function init(turtle, sizeX, sizeY, sizeZ, unsafeBoxes) {
	turtle.task = new MiningTask({ sizeX, sizeY, sizeZ })
	var task = new MiningTask(taskData)
	turtle.task = task
    currentPosition = turtle.position

    miningBox = new BoundingBox(currentPosition, task.sizeX, task.sizeY, task.sizeZ)
    

    //check if the turtle is within any of the unsafe boxes
	for (var i = 0; i < unsafeBoxes.length; i++) {
		var box = unsafeBoxes[i]
		if (box.isInside(currentPosition)) {
			return false
		}
	}
}
