'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.trim().split('\n').map(l => l.replace(':', '').split(' '))

const walk = (wires, target, path) => {
    if (target == 'out') {
        if (path[0] == 'svr') {
            const ret = (path.includes('fft')) * (path.includes('dac'))
            console.log(path.join(', '))
            return ret
        } else {
            return 1
        }
    }
    const total = wires
        .filter(f => f[0] == target)[0]
        .slice(1)
        .reduce((acc, cur) => acc + walk(wires, cur, [...path, cur]), 0)
    return total
}

const walkMemo = (wires, target, path, memo) => {
    const fft = path.includes('fft')
    const dac = path.includes('dac')
    const key = `${target},${fft},${dac}`
    if (memo.has(key)) return memo.get(key)
    const total = wires
        .filter(f => f[0] == target)[0]
        .slice(1)
        .reduce((acc, cur) => {
            if (cur == 'out') {
                if (path[0] == 'svr') {
                    return acc + (fft && dac)
                } else {
                    return acc + 1
                }
            }
            return acc + walkMemo(wires, cur, [...path, cur], memo)
        }, 0)
    memo.set(key, total)
    return total
}

const part1 = input => walkMemo(parseInput(input), 'you', ['you'], new Map())

const part2 = input => walkMemo(parseInput(input), 'svr', ['svr'], new Map())

module.exports = { part1, part2 }
