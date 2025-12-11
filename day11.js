'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.replace(':', '').split(' '))

const solve = (isPart2, input) => {
    return input
}

const walk = (wires, target) => {
    if (target == 'out') return 1
    return wires
        .filter(f => f[0] == target)[0]
        .slice(1)
        .reduce((acc, cur) => acc + walk(wires, cur), 0)
}

const part1 = input => walk(parseInput(input), 'you')

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
