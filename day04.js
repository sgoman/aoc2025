'use strict'

const { eightWayDeltas, gridCells, getSurrounding, gridToString } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.split(''))

const part1 = input => {
	input = parseInput(input)
	return gridCells(input)
		.filter(f => f.value == '@')
		.reduce((acc, {row, col, value}) => acc + (getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4), 0)
}

const part2 = input => {
	input = parseInput(input)
	let total = 0, papers = gridCells(input).filter(f => f.value == '@'), grabbed
	do {
		grabbed = false
		for (const {row, col, value} of papers) {
			const touching = getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@')
			if (touching.length < 4) {
				total++
				grabbed = true
				input[row][col] = '.'
			}
		}
		console.log(gridToString(input))
		papers = gridCells(input).filter(f => f.value == '@')
	} while(papers.length && grabbed)

	return total
}

module.exports = { part1, part2 }
