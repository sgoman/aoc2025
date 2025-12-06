// My solution for day 6 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/6/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const transpose = grid => grid.reduce((cols, row, r, arr) =>
    [ cols, row.map((_, c) => arr.map(l => l[c])) ][+(r == 0)] , [])

const part1 = input => {
    input = input.trim().split('\n').map(l => {
        l = l.trim().replace(/ +/g, ' ').split(' ')
        return [l, l.map(Number)][+(l[0].match(/\d+/) != null)]
    })
    const operations = input.pop()
    return transpose(input)
        .map((vals, i) => [
            vals.reduce((acc, cur) => acc * cur, 1),
            vals.reduce((acc, cur) => acc + cur, 0)
        ][+(operations[i] == '+')])
        .reduce((acc, cur) => acc + cur, 0)
}

const part2 = input => {
    input = transpose(input.trim().split('\n').map(l => l.split('')))
    input = input.map(l => l.map(c => [c, ' '][+(typeof c === 'undefined')])).reverse()
    return input.reduce(([total, block], line) => {
        const op = line.pop()
        const val = Number(line.join(''))
        block = [[...block, val], block][+(val == 0)]
        line = [
            0,
            block.reduce((a, v) => a + v, 0),
            block.reduce((a, v) => a * v, 1)
        ][' +*'.indexOf(op)]
        block = [ block, [], [] ][' +*'.indexOf(op)]
        return [total + line, block]
    }, [0, []])[0]
}

const db = document.body.innerText
console.time('Advent of Code day 6 flowless challenge both parts')
console.log([part1(db), part2(db)])
console.timeEnd('Advent of Code day 6 flowless challenge both parts')
