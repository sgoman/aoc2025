'use strict'

const { pairs } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(',').map(Number))

const area = ([[ax, ay],[bx, by]]) => (Math.abs(ax - bx) + 1) * (Math.abs(ay - by) + 1)

const getEdges = (reds) => {
	const edges = {}

	for (const i of reds.keys()) {
		const [ax, ay] = reds[i]
		const [bx, by] = reds[(i + 1) % reds.length]
		if (ax == bx) {
			const m = Math.max(ay, by)
			for (let y = Math.min(ay, by); y <= m; y++) {
				if (Object.hasOwn(edges, y)) {
					edges[y][0] = Math.min(edges[y][0], ax)
					edges[y][1] = Math.max(edges[y][1], ax)
				} else {
					edges[y] = [ax, ax]
				}
			}
		} else if (ay == by) {
			if (Object.hasOwn(edges, ay)) {
				edges[ay][0] = Math.min(edges[ay][0], ax, bx)
				edges[ay][1] = Math.max(edges[ay][1], ax, bx)
			} else {
				edges[ay] = [Math.min(ax, bx), Math.max(ax, bx)]
			}
		}
	}

	return edges
}

const validRect = ([ax, ay], [bx, by], edges) => {
	const minX = Math.min(ax, bx)
	const maxX = Math.max(ax, bx)
	const minY = Math.min(ay, by)
	const maxY = Math.max(ay, by)

	for (let y = minY; y <= maxY; y++) {
		if (!Object.hasOwn(edges, y)) return false
		const [emin, emax] = edges[y]
		if (minX < emin || maxX > emax) return false
	}
	return true
}

const maxArea = (reds, edges) => {
	let best = 0

	for (const i of reds.keys()) 
		for (let j = i + 1; j < reds.length; j++) 
			if (validRect(reds[i], reds[j], edges)) 
				best = Math.max(best, area([reds[i], reds[j]]))

	return best
}

const part1 = input => {
	input = pairs(parseInput(input))
		.map(area)
		.sort((a, b) => b - a)
	return input[0]
}

const part2 = input => {
	input = parseInput(input)
	const edges = getEdges(input)
	return maxArea(input, edges)
}

module.exports = { part1, part2 }
