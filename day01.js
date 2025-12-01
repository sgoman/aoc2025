'use strict'

const parseInput = input => input.split('\n').map(l => [l[0], Number(l.slice(1))])

const solve = (isPart2, input) => input.reduce(([zeroes, pos], [dir, val]) => {
    if (isPart2) {
        while(val--) {
            pos += (dir == 'L') ? -1 : 1
            pos = (pos + 100) % 100
            zeroes += pos == 0
        }
    } else {
        pos = (dir == 'L') ? (pos + 1000 - val) % 100 : (pos + val) % 100
        zeroes += pos == 0
    }
    return [zeroes, pos]
}, [0, 50])[0]

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
