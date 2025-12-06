'use strict'

const { transpose } = require('./utils.js')

const part1 = input => {
    input = input.trim().split('\n').map(l => {
        l = l.trim().replace(/ +/g, ' ').split(' ')
        return [l, l.map(Number)][+(l[0].match(/\d+/) != null)]
    })
    const operations = input.pop()
    return transpose(input)
        .map((vals, i) => [
            vals.reduce((acc, cur) => acc * cur, 1),
            vals.reduce((acc, cur) => acc + cur, 0)
        ][+(operations[i] == '+')])
        .reduce((acc, cur) => acc + cur, 0)
}

const part2 = input => {
    input = transpose(input.split('\n').map(l => l.split('')))
    input = input.map(l => l.map(c => [c, ' '][+(typeof c === 'undefined')])).reverse()
    return input.reduce(([total, block], line) => {
        const op = line.pop()
        const val = Number(line.join(''))
        block = [[...block, val], block][+(val == 0)]
        line = [
            0,
            block.reduce((a, v) => a + v, 0),
            block.reduce((a, v) => a * v, 1)
        ][' +*'.indexOf(op)]
        block = [ block, [], [] ][' +*'.indexOf(op)]
        return [total + line, block]
    }, [0, []])[0]
}

module.exports = { part1, part2 }
