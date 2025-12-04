'use strict'

const { eightWayDeltas, gridCells, getSurrounding } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.split(''))

const solve = (grid, total) => {
	let changed = gridCells(grid)
		.filter(f => f.value == '@')
		.reduce((acc, {row, col}) => {
			const removable = ~~(getSurrounding(grid, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4)
			grid[row][col] = '@.'[removable]
			return acc + removable
		}, 0)
	return ((changed == 0) * total) || solve(grid, total + changed)
}

const part1 = input => {
	input = parseInput(input)
	return gridCells(input)
		.filter(f => f.value == '@')
		.reduce((acc, {row, col}) => acc + (getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4), 0)
}

const part2 = input => solve(parseInput(input), 0)

module.exports = { part1, part2 }
