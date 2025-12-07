'use strict'

const { arraySum, gridToString } = require('./utils.js')

const parseInput = input => {
    return input.split('\n').map(l => [...l])
}

const memo = new Map()

// solves sample just fine, but needs memoization for part 2
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

const solver = (input, isPart2) => {
    const start = input.search('S')
    input = parseInput(input)
    const total = (new Array(input[0].length)).fll(0)
    total[start] = 1
    for (let row = 1; row < input.length; row++) {

    }
    return arraySum(total)
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
    // console.log(gridToString(input))
    return total
}

const part2 = input => solve(parseInput(input), 0, 1, input.search('S'))
// const part2 = input => solver(input, 1)

module.exports = { part1, part2 }
