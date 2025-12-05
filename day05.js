'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => {
    const [ranges, ing] = input.trim().split('\n\n')
	return [
		ranges.split('\n').map(l => l.split('-').map(Number)),
		ing.split('\n').map(Number)
	]
}

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
	const [ranges, ings] = parseInput(input)
    return ings.reduce((acc, ing) => acc + ranges.some(([l, h]) => ing >= l && ing <= h), 0)
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
