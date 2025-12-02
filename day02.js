'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(',').map(r => r.split('-').map(Number)))[0]

const solve = (isPart2, input) => {
    let total = 0
    for (const [start, end] of input) {
        for (let i = start; i <= end; i++) {
            if (/^(\d+)\1$/.test(i)) total += i
        }
    }
    return total
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
