// My solution for day 4 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/4/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const eightWayDeltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

const gridCells = grid => grid.reduce((cells, line, row) => [...cells, ...line.map((value, col) => { return {row, col, value} })], [])

const validCoordForGrid = (row, col, grid) => row >= 0 && row < grid.length && col >= 0 && col < grid[row].length

const getSurroundingGridCoords = (grid, row, col, deltas) =>
	deltas.flatMap(([r, c]) => Array(+(validCoordForGrid(row + r, col + c, grid))).fill([row + r, col + c]));

const getSurrounding = (grid, row, col, deltas) =>
	getSurroundingGridCoords(grid, row, col, deltas).reduce((tiles, [r, c]) => [...tiles, { tile: grid[r][c], row: r, col: c }], [])

const solve = (grid, total) => {
	let changed = gridCells(grid)
		.filter(f => f.value == '@')
		.reduce((acc, {row, col}) => {
			const removable = ~~(getSurrounding(grid, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4)
			grid[row][col] = '@.'[removable]
			return acc + removable
		}, 0)
	return ((changed == 0) * total) || solve(grid, total + changed)
}

const input = document.body.innerText.trim().split('\n').map(l => l.split(''))

console.time('Advent of Code 2025 day 4 both parts')
console.log([
	gridCells(input)
	.filter(f => f.value == '@')
	.reduce((acc, {row, col}) => acc + (getSurrounding(input, row, col, eightWayDeltas).filter(f => f.tile == '@').length < 4), 0),

	solve(input, 0)
])
console.timeEnd('Advent of Code 2025 day 4 both parts')

