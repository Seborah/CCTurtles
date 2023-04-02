var BoundingBox = require("./boundingBox.js")

class Position {
	/**
	 * @param {number} x integer position, floor is taken
	 * @param {number} y integer position, floor is taken
	 * @param {number} z integer position, floor is taken
	 */
	constructor(x, y, z) {
		this.x = Math.floor(x)
		this.y = Math.floor(y)
		this.z = Math.floor(z)
	}
	subtract(position) {
		return new Position(this.x - position.x, this.y - position.y, this.z - position.z)
	}
	add(position) {
		return new Position(this.x + position.x, this.y + position.y, this.z + position.z)
	}
	multiply(scalar) {
		return new Position(Math.floor(this.x * scalar), Math.floor(this.y * scalar), Math.floor(this.z * scalar))
	}
	divide(scalar) {
		return new Position(Math.floor(this.x / scalar), Math.floor(this.y / scalar), Math.floor(this.z / scalar))
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
	/**
	 * @param {number} rotation
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	static getDirectionalOffset(rotation, x, y, z) {
		var rot = (rotation * Math.PI) / 2
		return new Position(Math.round(Math.cos(rot) * x - Math.sin(rot) * z), y, Math.round(Math.sin(rot) * x + Math.cos(rot) * z))
	}

	/**
	 * @param {String} turtleID
	 * @param {Position} position
	 * @param {number} rotation
	 */
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
	 */
	constructor(turtle, sizeX, sizeY, sizeZ) {
		super("mining", turtle)
		this.sizeX = sizeX
		this.sizeY = sizeY
		this.sizeZ = sizeZ
	}
}

module.exports = { Turtle, Position, Task, MiningTask }
