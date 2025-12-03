'use strict'

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const best = (digits, row, res, pos) => {
	for (let i = 0; i < digits; i++) {
		res = res + Math.max(...row.slice(pos + 1, row.length - digits + 1 + i))
		pos += row.slice(pos + 1).indexOf(~~res[res.length - 1]) + 1
	}
	return Number(res)
}

const solve = (digits, input) => parseInput(input).reduce((total, row) => total + best(digits, row, '', -1), 0)

const part1 = input => solve(2, input)

const part2 = input => solve(12, input)

module.exports = { part1, part2 }
