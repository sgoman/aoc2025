// My solution for day 7 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/7/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const steps = count => [...(new Array(count)).keys()]

const memo = new Map()

const solve = (grid, timelines, row, col) => {
    const key = `${row},${col}`
    const val = memo.get(key)
        || (row == grid.length - 1) * (timelines + 1)
        || (grid[row][col] == '.') * solve(grid, timelines, row + 1, col)
        || solve(grid, timelines, row + 1, col - 1) + solve(grid, timelines, row + 1, col + 1)
    memo.set(key, val)
    return val
}

const part1 = input => steps(input.length)
    .slice(1)
    .reduce((total, row) => steps(input[row].length)
        .reduce((t, col) => {
            const above = +('S|'.includes(input[row - 1][col]))
            const splitter = +(input[row][col] == '^')
            input[row][col] = [input[row][col], '|'][above * !splitter]
            input[row][col - 1] = [input[row][col - 1], '|'][above * splitter]
            input[row][col + 1] = [input[row][col + 1], '|'][above * splitter]
            return above * splitter + t
        }, total), 0)

const part2 = input => solve(input, 0, 1, input[0].indexOf('S'))

const input = document.body.innerText.trim().split('\n').map(l => [...l])

console.time('Advent of Code day 7 flowless challenge both parts')
console.log([part1(input.map(r => r.map(c => c))), part2(input)])
console.timeEnd('Advent of Code day 7 flowless challenge both parts')
