'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.replace(':', '').split(' '))

const walkMemo = (wires, target, path, memo) => {
    const fft = path.includes('fft')
    const dac = path.includes('dac')
    const key = `${target},${fft},${dac}`
    if (memo.has(key)) return memo.get(key)
    const total = wires
        .filter(f => f[0] == target)[0]
        .slice(1)
        .reduce((acc, cur) => {
            if (cur == 'out') return acc + (path[0] == 'svr' ? (fft && dac) : 1)
            return acc + walkMemo(wires, cur, [...path, cur], memo)
        }, 0)
    memo.set(key, total)
    return total
}

const part1 = input => walkMemo(parseInput(input), 'you', ['you'], new Map())

const part2 = input => walkMemo(parseInput(input), 'svr', ['svr'], new Map())

module.exports = { part1, part2 }
