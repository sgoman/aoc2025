'use strict'

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
	return ranges
		.reduce((comp, [l, h]) => {
			const found = +(comp.some(([s, e], i) => {
				const contained = +(s <= l && l < e && e > h)
				const extend = +(s <= l && l <= e && e <= h)
				comp[i][1] = [e, h][extend]
				return contained || extend
			}))
			return [[...comp, [l, h]], comp][found]
		}, [ranges[0]])
		.reduce((acc, [l, h]) => acc + h - l + 1, 0)
}

module.exports = { part1, part2 }
