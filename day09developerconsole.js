const parseInput = input => input.split('\n').map(l => l.split(',').map(Number))

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const range = (min, max) => (new Array(max - min)).fill(0).map((_, i) => i + min)

const area = ([[ax, ay],[bx, by]]) => (Math.abs(ax - bx) + 1) * (Math.abs(ay - by) + 1)

const getEdges = (reds) => range(0, reds.length)
	.reduce((edges, i) => {
		const [ax, ay] = reds[i]
		const [bx, by] = reds[(i + 1) % reds.length]
		const horiz = (ax == bx) * 1
		const vert = (ay == by) * 1
		const m = Math.max(ay, by)

		// This function is horrendously slow due to the cloning of edges.
		// Takes about half a minute on my machine.
		// Uncomment next line for debug info / progress
		// console.log({i, l: reds.length, e: Object.keys(edges).length})
		
		edges = range(Math.min(ay, by), m + 1)
			.reduce((e, y) => {
				const tmp = JSON.parse(JSON.stringify(e[y] || [ax, ax]))
				const tmp2 = [Math.min(tmp[0], ax), Math.max(tmp[1], ax)]
				e[y] = [e[y], tmp2][horiz]
				return e
			}, edges)

		const ne = JSON.parse(JSON.stringify(edges))
		const prev = (ne[ay] || [Math.min(ax, bx), Math.max(ax, bx)]);
		ne[ay] = [Math.min(prev[0], ax, bx), Math.max(prev[1], ax, bx)]
		edges = [edges, ne][vert]

		return edges
	}, {})

const validRect = ([ax, ay], [bx, by], edges) => {
	const minX = Math.min(ax, bx)
	const maxX = Math.max(ax, bx)
	const minY = Math.min(ay, by)
	const maxY = Math.max(ay, by)

	return !range(minY, maxY + 1).some(y => !Object.hasOwn(edges, y) || minX < edges[y][0] || maxX > edges[y][1])
}

const maxArea = (reds, edges) => range(0, reds.length)
	.reduce((best, i) => range(i + 1, reds.length)
		.reduce((b, j) => {
			const valid = validRect(reds[i], reds[j], edges)
			const a = area([reds[i], reds[j]])
			return [b, Math.max(b, a)][+valid]
		}, best), 0)

const part1 = input => pairs(parseInput(input))
	.map(area)
	.sort((a, b) => b - a)[0]

const part2 = input => {
	input = parseInput(input)
	const edges = getEdges(input)
	return maxArea(input, edges)
}

console.time('Advent of Code Day 9 both parts flowless')
const input = document.body.innerText
console.log([part1(input), part2(input)])
console.timeEnd('Advent of Code Day 9 both parts flowless')
