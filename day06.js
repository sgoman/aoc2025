'use strict'

const { transpose } = require('./utils.js')

const parseInput = input => {
    return input.trim().split('\n').map(l => {
        l = l.trim().replace(/ +/g, ' ').split(' ')
        return [l, l.map(Number)][+(l[0].match(/\d+/) != null)]
    })
}

const solve = (isPart2, input) => {
    const operations = input.pop()
    return transpose(input)
        .map((vals, i) => [
            vals.reduce((acc, cur) => acc * cur, 1),
            vals.reduce((acc, cur) => acc + cur, 0)
        ][+(operations[i] == '+')])
        .reduce((acc, cur) => acc + cur, 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
