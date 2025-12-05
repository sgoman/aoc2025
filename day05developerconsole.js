// My solution for day 5 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/5/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const parseInput = input => {
	const [ranges, ing] = input.trim().split('\n\n')
	return [
		ranges.split('\n').map(l => l.split('-').map(Number)),
		ing.split('\n').map(Number)
	]
}

const part1 = ([ranges, ings]) => ings.reduce((acc, ing) => acc + ranges.some(([l, h]) => ing >= l && ing <= h), 0)

const part2 = ([ranges]) => {
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

const db = parseInput(document.body.innerText)
console.time('Advent of Code day 5 flowless challenge both parts')
console.log([part1(db), part2(db)])
console.timeEnd('Advent of Code day 5 flowless challenge both parts')
