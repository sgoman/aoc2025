'use strict'

const { gridToString } = require('./utils.js')

const parseInput = input => {
    return input.split('\n').map(l => [...l])
}

const solve = (isPart2, input) => {
    let total = 0
    for (let row = 1; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if ('S|'.includes(input[row - 1][col])) {
                const tile = input[row][col]
                if (tile == '^') {
                    if (col > 0) input[row][col - 1] = '|'
                    if (col < input[row].length - 1) input[row][col + 1] = '|'
                    total++
                } else {
                    input[row][col] = '|'
                }
            }
        }
    }
    console.log(gridToString(input))
    return total
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
