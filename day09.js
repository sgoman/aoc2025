'use strict'

const { pairs } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(',').map(Number))

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
	input = pairs(parseInput(input))
		.map(([[ax, ay],[bx, by]]) => (Math.abs(ax - bx) + 1) * (Math.abs(ay - by) + 1))
		.sort((a, b) => b - a)
    return input[0]
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
