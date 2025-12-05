'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => {
    const [ranges, ing] = input.trim().split('\n\n')
	return [
		ranges.split('\n').map(l => l.split('-').map(Number)),
		ing.split('\n').map(Number)
	]
}

const part1 = input => {
	const [ranges, ings] = parseInput(input)
    return ings.reduce((acc, ing) => acc + ranges.some(([l, h]) => ing >= l && ing <= h), 0)
}

const part2 = input => {
	const ranges = parseInput(input)[0]
	ranges.sort((a, b) => a[0] - b[0])
	const comp = [ranges[0]]
	for (const [l, h] of ranges) {
		let found = 0
		for (const [i, [s, e]] of [...comp.entries()]) {
			if (s <= l && l <= e && e <= h) {
				found = 1
				comp[i][1] = h
				break
			}
			if (s <= l && l < e && e > h) {
				found = 1
				break
			}
		}
		if (found == 0) comp.push([l, h])
	}
	return comp.reduce((acc, [l, h]) => acc + h - l + 1, 0)
}

module.exports = { part1, part2 }
