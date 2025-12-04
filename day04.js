'use strict'

const { eightWayDeltas, gridCells, getSurrounding } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.split(''))

const solve = (grid, total, isPart1) => {
	let changed = gridCells(grid)
		.filter(f => f.value == '@')
		.reduce((acc, {row, col}) => {
			const removable = +(getSurrounding(grid, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4)
			grid[row][col] = '@.'[removable * !isPart1]
			return acc + removable
		}, 0)
	return ((changed == 0) * total) || (isPart1 * changed) || solve(grid, total + changed, isPart1)
}

const part1 = input => solve(parseInput(input), 0, 1)

const part2 = input => solve(parseInput(input), 0, 0)

module.exports = { part1, part2 }
