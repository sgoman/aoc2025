'use strict'

const parseInput = input => input.split('\n').map(l => [...l])

const memo = new Map()

const solve = (grid, timelines, row, col) => {
    const tile = grid[row][col]
    const key = `${row},${col}`
    if (memo.has(key)) return memo.get(key)
    if (row == grid.length - 1) return timelines + 1
    if (tile == '.') return solve(grid, timelines, row + 1, col)
    const val = solve(grid, timelines, row + 1, col - 1) + solve(grid, timelines, row + 1, col + 1)
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

const part2 = input => solve(parseInput(input), 0, 1, input.search('S'))

module.exports = { part1, part2 }
