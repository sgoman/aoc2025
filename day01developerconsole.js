// My solution to this challenge: https://www.reddit.com/r/adventofcode/comments/1p2ral9/flowless_challenge_2025/
// Purely functional and branchless programming
// Just paste this code into the developer console on https://adventofcode.com/2025/day/1/input (try F12 or CTRL+I in your browser)
// The two numbers are the results for the first and second part for your personal input

onsole.log(
    document.body.innerText
    .split('\n')
    .map(l => [(l[0] == 'R') * 2 - 1, ~~l.slice(1)])
    .reduce(([p1, p2, pos], [dir, val]) => {
        [pos, p2] = (new Array(val))
            .fill(0)
            .reduce(([p, z, d]) => {
                p = (p + d + 100) % 100
                z += p == 0
                return [p, z, d]
            }, [pos, p2, dir])
        p1 += pos == 0
        return [p1, p2, pos]
    }, [0, 0, 50])
    .slice(0, 2)
)
