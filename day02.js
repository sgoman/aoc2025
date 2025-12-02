'use strict'

const parseInput = input => input.split(',').map(r => r.split('-').map(Number))

const solve = (part, input) => parseInput(input)
    .reduce((total, [start, end]) => {
        for (let i = start; i <= end; i++)
            total += [/^(\d+)\1$/, /^(\d+)\1+$/][part].test(i) * i
        return total
    }, 0)

const part1 = input => solve(0, input)

const part2 = input => solve(1, input)

module.exports = { part1, part2 }
