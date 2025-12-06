'use strict'

const { transpose, arraySum, arrayProduct } = require('./utils.js')

const part1 = input => {
    input = input.trim().split('\n').map(l => {
        l = l.trim().replace(/ +/g, ' ').split(' ')
        return [l, l.map(Number)][+(l[0].match(/\d+/) != null)]
    })
    const op = input.pop()
    return arraySum(transpose(input)
        .map((vals, i) => [arrayProduct(vals), arraySum(vals)][+(op[i] == '+')]))
}

const part2 = input => transpose(input.split('\n').map(l => [...l]))
    .map(l => l.map(c => [c, ' '][+(typeof c === 'undefined')]))
    .reverse()
    .reduce(([total, vals], l) => {
        const op = l.pop()
        const value = Number(l.join(''))
        vals = [[...vals, value], vals][+(value == 0)]
        l = [0, arraySum(vals), arrayProduct(vals)][' +*'.indexOf(op)]
        vals = [[], vals][+(op == ' ')]
        return [total + l, vals]
    }, [0, []])[0]

module.exports = { part1, part2 }
