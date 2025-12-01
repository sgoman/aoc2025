'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => [l[0], Number(l.slice(1))])

const solve = (isPart2, input) => {
    let pos = 50, zeroes = 0
    for (const [dir, val] of input) {
        pos = (dir == 'L') ? (pos + 1000 - val) % 100 : (pos + val) % 100
        zeroes += pos == 0
    }
    return zeroes
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
