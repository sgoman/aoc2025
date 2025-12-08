'use strict'

// taken from https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-heap-binary-heap
// methods and attributes starting with an underscore are considered private and should not be called from the outside
// Min-Heap example: new Heap((a, b) => a[0] - b[0])
// Max-Heap example: new Heap((a, b) => b[0] - a[0])
class Heap {
    constructor(comparator) {
        this._heap = []
        this._comparator = comparator || ((a, b) => a - b)
    }

    size() { return this._heap.length }

    isEmpty() { return this.size() == 0 }

    peek() { return this._heap[0] }

    insert(value) { this._heap.push(value); this._heapifyUp() }

    extract() {
        if (this.isEmpty()) return null
        const poppedValue = this.peek()
        const bottom = this.size() - 1
        if (bottom > 0) this._swap(0, bottom)
        this._heap.pop()
        this._heapifyDown()
        return poppedValue
    }

    _parentIndex(i) { return Math.floor((i - 1) / 2) }

    _parentValue(i) { return i < this.size() && this._parentIndex(i) >= 0 ? this._heap[this._parentIndex(i)] : undefined }

    _leftChildIndex(i) { return 2 * i + 1 }

    _leftChildValue(i) { return this._hasLeftChild(i) ? this._heap[this._leftChildIndex(i)] : undefined }

    _hasLeftChild(i) { return this._leftChildIndex(i) < this.size() }

    _rightChildIndex(i) { return 2 * i + 2 }

    _rightChildValue(i) { return this._hasRightChild(i) ? this._heap[this._rightChildIndex(i)] : undefined }

    _hasRightChild(i) { return this._rightChildIndex(i) < this.size() }

    _swap(i, j) { [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]] }

    _heapifyUp() {
        let nodeIndex = this.size() - 1
        while ( nodeIndex > 0 && this._comparator(this._parentValue(nodeIndex), this._heap[nodeIndex]) > 0) {
            this._swap(nodeIndex, this._parentIndex(nodeIndex))
            nodeIndex = this._parentIndex(nodeIndex)
        }
    }

    _heapifyDown() {
        let currNodeIndex = 0
        while (this._hasLeftChild(currNodeIndex)) {
            let smallerChildIndex = this._leftChildIndex(currNodeIndex)
            if (
                this._hasRightChild(currNodeIndex) &&
                this._comparator(
                    this._rightChildValue(currNodeIndex),
                    this._leftChildValue(currNodeIndex)
                ) < 0
            ) {
                smallerChildIndex = this._rightChildIndex(currNodeIndex)
            }
            if ( this._comparator( this._heap[currNodeIndex], this._heap[smallerChildIndex]) <= 0) break
            this._swap(currNodeIndex, smallerChildIndex)
            currNodeIndex = smallerChildIndex
        }
    }
}

const pairs = (arr) => arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()

const parseInput = input => input.split('\n').map(l => l.split(',').map(Number))

const solve = (isPart2, input) => {
	const heap = new Heap((a, b) => a[0] - b[0])
	for (const [p, q] of pairs(input)) {
		const dist = Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
		heap.insert([dist, p, q])
	}
	// console.log(heap.size())
    const targetSize = heap.size() - input.length

    // use the heap to implement Kruskal's algorithm
    const parent = new Map()
    const find = (x) => {
        if (!parent.has(x)) parent.set(x, x)
        if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))
        return parent.get(x)
    }
    const union = (x, y) => {
        const rootX = find(x)
        const rootY = find(y)
        if (rootX !== rootY) parent.set(rootX, rootY)
    }

    let lastDist = 0, edgesUsed = 0, clusters = new Map(), dist, j1, j2, clusterSizes
    while (!heap.isEmpty()
            && (isPart2 ? (clusters.size != 1 && clusters.values().length != input.length) : heap.size() > targetSize)
        ) {
        const [dist, p, q] = heap.extract()
        j1 = p[0]
        j2 = q[0]

        //console.log({j1, j2})

        if (find(p) !== find(q)) {
            union(p, q)
            edgesUsed++
            lastDist = dist
        }

        clusters = new Map()
        for (const point of input) {
            const root = find(point)
            if (!clusters.has(root)) clusters.set(root, [])
            clusters.get(root).push(point)
        }

        // console.log(clusters.size)

        // get the sizes of the largest three clusters
        clusterSizes = Array.from(clusters.values()).map(c => c.length).sort((a, b) => b - a).slice(0, 3)
    }

    // console.log(clusters)

    return isPart2 ? (j1 * j2) : clusterSizes.reduce((a, b) => a * b, 1)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
