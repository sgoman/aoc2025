'use strict'

const parseInput = input => input.split('\n').map(l => [...l])

const solve = (grid, timelines, row, col, memo) => {
    const key = `${row},${col}`
    const val = memo.get(key)
        || (row == grid.length - 1) * (timelines + 1)
        || (grid[row][col] == '.') * solve(grid, timelines, row + 1, col, memo)
        || solve(grid, timelines, row + 1, col - 1, memo) + solve(grid, timelines, row + 1, col + 1, memo)
    memo.set(key, val)
    return val
}

const part1 = input => {
    input = parseInput(input)
    let total = 0
    for (let row = 1; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if ('S|'.includes(input[row - 1][col])) {
                const tile = input[row][col]
                if (tile == '^') {
                    input[row][col - 1] = '|'
                    input[row][col + 1] = '|'
                    total++
                } else {
                    input[row][col] = '|'
                }
            }
        }
    }
    return total
}

const part2 = input => solve(parseInput(input), 0, 1, input.search('S'), new Map())

module.exports = { part1, part2 }
