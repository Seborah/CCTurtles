const { Turtle, Position, MiningTask } = require("../util/classes.js")
const { BoundingBox } = require("../util/boundingBox.js")

/**
 *
 * @param {Turtle} turtle
 * @param {number} sizeX how far in front of the turtle to mine
 * @param {number} sizeY how far down to mine
 * @param {number} sizeZ how far to the right of the turtle to mine
 * @param {Array<BoundingBox>} unsafeBoxes
 *  @returns {boolean} true if the turtle is safe to mine in, false if it is not
 */
function init(turtle, sizeX, sizeY, sizeZ) {
	var farCornerPosition = Turtle.getDirectionalOffset(turtle.rotation, sizeX, -sizeY, sizeZ).add(turtle.position)
	try {
		var miningBox = new BoundingBox(current, farCornerPosition, true)
	} catch (e) {
		console.log(e)
		console.log("Mining box is not safe")
	}
}
