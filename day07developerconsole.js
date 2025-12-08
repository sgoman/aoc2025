// My solution for day 7 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/7/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

const input = document.body.innerText.trim().split('\n').map(l => [...l])

const solver = grid => {
    let splits = Array(grid[0].length).fill(0)
    splits[grid[0].indexOf('S')] = 1
    const res = grid
        .reduce((data, row) => row
            .reduce(([p1, sp], t, col) => {
                const activeSplitter = +(t == '^' && sp[col] > 0)
                const _ = [col - 1, col + 1]
                    .filter(f => f >= 0 && f < row.length)
                    .reduce((q, r) => sp[r] += [0, sp[col]][activeSplitter], 0)
                sp[col] = [sp[col], 0][activeSplitter]
                return [p1 + activeSplitter, sp]
            }, data)
        , [0, splits])
    return [res[0], res[1].reduce((a, c) => a + c, 0)]
}

console.time('Advent of Code day 7 flowless challenge both parts')
console.log(solver(input))
console.timeEnd('Advent of Code day 7 flowless challenge both parts')
