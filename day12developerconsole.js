// My solution for day 12 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/12/input (try F12 or CTRL+I in your browser)
// The number is the solution to the first part of the challenge.
// There is no second part to this days challenge, just have 23 stars total

const parseInput = input => input
    .trim()
    .split('\n\n')
    .reduce(([boxes, regions], block) => {
        const lines = block.split('\n')
        const hasX = +(lines[0].search('x') != -1)
        boxes = [[...boxes, lines.slice(1).join('').split('').filter(c => c == '#').length], boxes][hasX]
        regions = [regions, lines.reduce((reg, line) => [...reg, line.match(/\d+/g)?.map(Number)], regions)][hasX]
        return [boxes, regions]
    }, [[], []])

const part1 = input => {
    const [boxes, regions] = parseInput(input)
    return regions.reduce((total, region) => {
        const area = region[0] * region[1]
        const needed = region.slice(2).reduce((acc, cur, i) => acc + cur * boxes[i], 0)
        return total + +(area >= needed)
    }, 0)
}

console.time('Advent of Code Day 12 both parts flowless')
console.log(part1(document.body.innerText.trim()))
console.timeEnd('Advent of Code Day 12 both parts flowless')
