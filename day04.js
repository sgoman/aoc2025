'use strict'

const { eightWayDeltas, gridCells, getSurrounding } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.split(''))

const solve = (isPart2, input) => gridCells(input)
	.filter(f => f.value == '@')
//.forEach(({row, col, value}) => console.log(getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@').length))
	.reduce((acc, {row, col, value}) => acc + (getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4), 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
