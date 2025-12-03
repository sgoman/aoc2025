'use strict'

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const best = (digits, row) => {
	let res = ''
	let pos = -1
	let l = row.length
	for (let i = 0; i < digits; i++) {
		res = res + Math.max(...row.slice(pos + 1, l - digits + 1 + i))
		pos += row.slice(pos + 1).indexOf(~~res[res.length - 1]) + 1
		// console.log({row, digits, res, pos, i, last: res[res.length - 1], ind: row.slice(pos + 1).indexOf(res[res.length - 1])})
	}
	return Number(res)
}

const solve = (digits, input) => {
	input = parseInput(input)
	let total = 0
	for (const nums of input) {
		total += best(digits, nums)
	}
    return total
}

const part1 = input => solve(2, input)

const part2 = input => solve(12, input)

module.exports = { part1, part2 }
