'use strict'

const { transpose, arraySum, arrayProduct } = require('./utils.js')

const part1 = input => {
    input = input.trim().split('\n').map(l => {
        l = l.trim().replace(/ +/g, ' ').split(' ')
        return [l, l.map(Number)][+(l[0].match(/\d+/) != null)]
    })
    const operations = input.pop()
    return arraySum(transpose(input)
        .map((vals, i) => [arrayProduct(vals), arraySum(vals)][+(operations[i] == '+')]))
}

const part2 = input => transpose(input.split('\n').map(l => l.split('')))
    .map(l => l.map(c => [c, ' '][+(typeof c === 'undefined')]))
    .reverse()
    .reduce(([total, block], line) => {
        const op = line.pop()
        const val = Number(line.join(''))
        block = [[...block, val], block][+(val == 0)]
        line = [0, arraySum(block), arrayProduct(block)][' +*'.indexOf(op)]
        block = [[], block][+(op == ' ')]
        return [total + line, block]
    }, [0, []])[0]

module.exports = { part1, part2 }
