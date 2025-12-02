// My solution for day 2 to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/2/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

console.log(
    document.body.innerText
    .split(',')
    .map(range => range.split('-').map(Number))
    .reduce(([p1, p2], [start, end]) => 
        (new Array(end - start))
        .fill(0)
        .reduce(([a, b, v]) => [
            a + /^(\d+)\1$/.test(v) * v,
            b + /^(\d+)\1+$/.test(v) * v,
            v + 1
        ], [p1, p2, start])
    , [0, 0])
    .slice(0, 2)
)
