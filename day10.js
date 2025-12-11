'use strict'

const { init } = require('z3-solver')

const alpha = 'abcdefghijklmnopqrstuvwxyz'

const parseInput = input => input.trim().split('\n').reduce((machines, line) => {
	const [left, rest] = line.split(']')
	const leds = left.replace('[', '').replace(/\./g, '0').replace(/#/g, '1')
	const goal = parseInt(leds.split('').reverse().join(''), 2)
	const [mid, right] = rest.split('{')
	const schematics = mid.trim().replace(/\(/g, '').replace(/\)/g, '').split(' ').map(b => b.split(',').map(Number))
	const buttons = schematics.map(s => s.reduce((acc, cur) => acc ^ (1 << cur), 0))
	const jolts = right.replace('}', '').trim().split(',').map(Number)
	machines.push({goal, buttons, schematics, jolts})
	return machines
}, [])

const bfs = ({goal, buttons}) => {
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

const joltage = async (input) => {
	let counts = 0

	const { Context } = await init()

	for (const {schematics, jolts} of parseInput(input)) {
		const { Optimize, Int } = new Context('main')
		const solver = new Optimize()

		const changes = schematics.reduce((schems, button) => [...schems, button.reduce((counter, b) => {counter[b]++; return counter}, (new Array(jolts.length).fill(0)))], [])

		const vars = []

		for (let i = 0; i < schematics.length; i++) {
			const v = Int.const(`${alpha[i]}`)
			solver.add(v.ge(0))
			vars.push(v)
		}

		for (let i = 0; i < jolts.length; i++) {
			let condition = Int.val(0)
			for (const [y, btn] of changes.entries()) {
				if (btn[i] === 1) {
					condition = condition.add(vars[y])
				}
			}
			condition = condition.eq(Int.val(jolts[i]))
			solver.add(condition)
		}

		const sumvars = vars.reduce((acc, cur) => acc.add(cur), Int.val(0))

		solver.minimize(sumvars)

		const res = await solver.check()
		if (res === 'sat') {
			const result = +solver.model().eval(sumvars).toString()
			counts += result
		}
	}
	return counts
}

const part1 = input => parseInput(input).reduce((acc, machine) => acc + bfs(machine), 0)

const part2 = async input => { return await joltage(input) }

module.exports = { part1, part2 }
