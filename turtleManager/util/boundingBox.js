var { Position } = require("./classes")

/**
 * @typedef {Object} BoundingBox
 * @property {Position} positionLow
 * @property {Position} positionHigh
 *
 */
class BoundingBox {
	/**
	 * @type {Array<BoundingBox>}
	 */
	static allBoxes = []
	static currentID = 0

	/**
	 * @param {Position} position1
	 * @param {Position} position2
	 * @param {boolean} safe if the must be entirely safe the box will check all other boxes for collisions
	 * @description Creates a bounding box from two positions
	 * @throws {Error} if the box is not safe and the safe option was set to true
	 *
	 */
	constructor(position1, position2, safe) {
		var x1 = position1.x
		var y1 = position1.y
		var z1 = position1.z
		var x2 = position2.x
		var y2 = position2.y
		var z2 = position2.z

		this.width = Math.ceil(Math.abs(x1 - x2))
		this.height = Math.ceil(Math.abs(y1 - y2))
		this.depth = Math.ceil(Math.abs(z1 - z2))
		this.positionLow = new Position(Math.min(x1, x2), Math.min(y1, y2), Math.min(z1, z2))
		this.positionHigh = new Position(Math.max(x1, x2), Math.max(y1, y2), Math.max(z1, z2))
		if (safe) {
			for (var i = 0; i < BoundingBox.allBoxes.length; i++) {
				var box = BoundingBox.allBoxes[i]
				if (box.collides(this)) {
					throw new Error("Collision detected")
				}
			}
		}
		/**
		 * @type {number}
		 */
		this.id = BoundingBox.currentID++
		BoundingBox.allBoxes.push(this)
	}
	/**
	 * @param {Position} position
	 * @returns {boolean}
	 * @description Checks if a position is inside the bounding box
	 */
	isInside(position) {
		return (
			position.x >= this.position1.x &&
			position.x <= this.position2.x &&
			position.y >= this.position1.y &&
			position.y <= this.position2.y &&
			position.z >= this.position1.z &&
			position.z <= this.position2.z
		)
	}

	/**
	 * @param {BoundingBox} box
	 * @returns {boolean}
	 * @description Checks if a bounding box collides with this box
	 * @
	 */
	collides(box) {
		a = this.positionLow.subtract(box.positionHigh)
		b = box.positionLow.subtract(this.positionHigh)

		return a.x <= 0 && a.y <= 0 && a.z <= 0 && b.x <= 0 && b.y <= 0 && b.z <= 0
	}
}

module.exports = { BoundingBox }
