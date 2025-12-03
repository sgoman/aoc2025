'use strict'

const { combineConditionally } = require('./utils.js')

const pairs = tmp => tmp.length == 2
const tooShort = tmp => tmp.length < 2

const parseInput = input => input.split('\n').map(l => l.split(''))

const solve = (isPart2, input) => {
	let total = 0
	for (const nums of input) {
		const combos = combineConditionally(nums, pairs, tooShort)
		total += Math.max(...combos.map(c => ~~(c.join(''))))
	}
    return total
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
