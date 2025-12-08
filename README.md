Advent of Code 2025 in JavaScript
=================================

These are my solutions to the daily challenges of adventofcode.com, provided in plain JavaScript using NodeJS and the NPM module advent-of-code.

Eric Wastl informed us that after 10 years of 25 two part challenges, 2025 will be the first year to only feature 12 days instead of 25. No word on how the difficulty curve will adapt.

Installation
------------

After cloning this repository, run "npm install" and make sure that the aoc file is executable.

Set an environment variable with the name "ADVENT_SESSION" and the value of "session=YOURSESSION-ID" (with YOURSESSION-ID being the session ID from the cookie on the adventofcode.com site after logging in). This enables fetching your personalized input from adventofcode.com.

To run part 2 of the first challenge with your own input, execute "./aoc 1 2 +" or "./aoc 1 2 - < input1.txt" to provide an input file on standard in.

If you want to write a days challenge from scratch, issue "./aoc init 1" to generate a boilerplate file for day 1. You can change the boilerplate by editing the file dayTemplate.js.

No Installation
---------------

Most of the solutions can be run on the Advent of Code page for the input data.

- Copy the code for one day, but leave out the first and last line (don't include the 'use strict' and the 'module.exports' lines). If the code has a line that has "require('./utils.js')" near the top, skip that line as well, but remember to copy the referenced functions from utils.js afterwards.
- Paste the code into the developer console in your browser when viewing the puzzle input page for a day.
- Paste the code of any functions that were referenced from utils.js, if any.
- Enter the command "part1(document.body.innerText)" to run the solution for part 1. Replace the 1 with a 2 for part two. Most of the time you will be able to run both parts repeatedly without problems, but sometimes you can only run one part correctly (e.g. if the code relies on a global cache or something like that). You will have to reload the page and copy the code again in that case, only running the part you are interested in.

Example for the second day of 2024:
- copy lines 5 through 23 from day02.js (i.e. all code excluding the lines that contain 'use strict', 'utils.js' and 'module.exports')
- open the page https://adventofcode.com/2024/day/2/input
- hit F12 or whatever shortcut opens the developer tools in your browser
- paste the code into the console tab and hit enter
- copy the code for the function combineConditionally from utils.js
- paste it into the console tab of the developer tools as well
- type "part1(document.body.innerText)" without the quotes into the console tab and hit enter for the solution to part 1 


The challenges
--------------

1. **[Day 1: Secret Entrance](day01.js)** Turn the dial on a safe and count how many times it lands on or crosses 0. Bonus: [Solution for flowless challenge](day01developerconsole.js)
2. **[Day 2: Gift Shop](day02.js)** Applying a simple regex to each number of every range. Bonus: [Solution for flowless challenge](day02developerconsole.js)
3. **[Day 3: Lobby](day03.js)** Construct the highest number of the digits provided in order. Bonus: [Solution for flowless challenge](day03developerconsole.js)
4. **[Day 4: Printing Department](day04.js)** Cellular Automaton, grids are back in business! Bonus: [Solution for flowless challenge](day04developerconsole.js)
5. **[Day 5: Cafeteria](day05.js)** Working with massive ranges. Bonus: [Solution for flowless challenge](day05developerconsole.js)
6. **[Day 6: Trash Compactor](day06.js)** Cephalopod math problems, reading numbers and operations from a grid. Bonus: [Solution for flowless challenge](day06developerconsole.js)
7. **[Day 7: Laboratories](day07.js)** Counting beam splits or deflections. Bonus: [Solution for flowless challenge](day07developerconsole.js)
8. **[Day 8: Playground](day08.js)** Implementing the euclidian distance spanning tree graph, in this case Kruskal's algorithm.
