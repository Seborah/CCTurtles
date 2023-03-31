var BoundingBox = require("./boundingBox.js")
class Position {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}
	subtract(position) {
		return new Position(this.x - position.x, this.y - position.y, this.z - position.z)
	}
	add(position) {
		return new Position(this.x + position.x, this.y + position.y, this.z + position.z)
	}
	multiply(scalar) {
		return new Position(this.x * scalar, this.y * scalar, this.z * scalar)
	}
	divide(scalar) {
		return new Position(this.x / scalar, this.y / scalar, this.z / scalar)
    }
    
}

/**
 * @typedef {Object} Turtle
 * @property {String} turtleID
 * @property {Position} position
 * @property {number} rotation
 * @property {Task} task
 * @property {Position} expectedPosition
 */
class Turtle {
	constructor(turtleID, position, rotation) {
		/**
		 * @type {String}
		 */
		this.turtleID = turtleID
		/**
		 * @type {number}
		 */
		this.rotation = rotation
		/**
		 * @type {Position}
		 */
		this.position = position
		/**
		 * @type {Position}
		 */
		this.expectedPosition = position
	}
}

class Task {
	constructor(taskName, turtle) {
		this.taskName = taskName
		this.turtle = turtle
	}
}

class MiningTask extends Task {
	/**
	 * @param {Turtle} turtle
	 * @param {number} sizeX the length of the hole to dig
	 * @param {number} sizeY the depth of the hole to dig
	 * @param {number} sizeZ the width of the hole to dig
	 * @param {Array<BoundingBox>} boxes the boxes that are not safe to mine in
	 */
	constructor(turtle, sizeX, sizeY, sizeZ, boxes) {
		super("mining", turtle)
		this.sizeX = sizeX
		this.sizeY = sizeY
		this.sizeZ = sizeZ
	}
}

module.exports = { Turtle, Position, Task, MiningTask }
