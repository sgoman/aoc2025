'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => {
    return input.trim().split('\n\n').reduce(([boxes, regions], block) => {
        const lines = block.split('\n')
        if (lines[0].search('x') == -1) {
            return [[...boxes, lines.slice(1).join('').split('').filter(c => c == '#').length], regions]
        } else {
            for (const line of lines) 
                regions.push(line.match(/\d+/g).map(Number))
            return [boxes, regions]
        }
    }, [[], []])
}

const part1 = input => {
    const [boxes, regions] = parseInput(input)
    let total = 0
    for (const region of regions) {
        const area = region[0] * region[1]
        const needed = region.slice(2).reduce((acc, cur, i) => acc + cur * boxes[i], 0)
        console.log({region, area, needed})
        total += +(area >= needed)
    }
    return total
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
