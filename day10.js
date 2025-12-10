'use strict'

// const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.trim().split('\n').reduce((machines, line) => {
	const [left, rest] = line.split(']')
	const leds = left.replace('[', '').replace(/\./g, '0').replace(/#/g, '1')
	const goal = parseInt(leds.split('').reverse().join(''), 2)
	const [mid, right] = rest.split('{')
	const schematics = mid.trim().replace(/\(/g, '').replace(/\)/g, '').split(' ').map(b => b.split(',').map(Number))
	const buttons = schematics.map(s => s.reduce((acc, cur) => acc ^ (1 << cur), 0))
	const jolts = right.replace('}', '').trim().split(',').map(Number)
	machines.push({goal, buttons, jolts})
	return machines
}, [])

const solve = (isPart2, input) => {
    return input
}

const work = ({goal, buttons}) => {
	const states = new Map()
	states.set(0, 0)
	const queue = [0]
	for (const q of queue) {
		if (q == goal) return states.get(q)

		for (const button of buttons) {
			const t = q ^ button
			if (!states.has(t)) {
				states.set(t, states.get(q) + 1)
				queue.push(t)
			}
		}
	}
	console.error(`${goal} is unreachable!`)
	return 0
}

const part1 = input => parseInput(input).reduce((acc, machine) => acc + work(machine), 0)

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
