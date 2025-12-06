// My solution for day 3 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/3/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const steps = count => [...(new Array(count)).keys()]

const best = (digits, row) => Number(
    steps(digits)
	.reduce(([res, pos], i) => {
		const r = res + Math.max(...row.slice(pos + 1, row.length - digits + 1 + i))
		return [ r, pos + row.slice(pos + 1).indexOf(~~r[r.length - 1]) + 1]
	}, ['', -1])[0]
)

console.log(
	document.body.innerText
	.trim()
	.split('\n')
	.map(l => l.split('').map(Number))
	.reduce(([p1, p2], row) => [p1 + best(2, row), p2 + best(12, row)], [0, 0])
)
