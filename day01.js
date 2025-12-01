'use strict'

const parseInput = input => input.split('\n').map(l => [(l[0] == 'R') * 2 - 1, ~~l.slice(1)])

const solve = (part, input) => input.reduce(([pos, p1, p2], [dir, val]) => {
    while(val--) {
        pos = (pos + dir + 100) % 100
        p2 += pos == 0
    }
    p1 += pos == 0
    return [pos, p1, p2]
}, [50, 0, 0])[part]

const part1 = input => solve(1, parseInput(input))

const part2 = input => solve(2, parseInput(input))

module.exports = { part1, part2 }
