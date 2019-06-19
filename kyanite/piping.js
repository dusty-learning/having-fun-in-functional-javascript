/**
 * Piping is pretty important to use when it comes to data flow
 * A pipe basically acts as a funnel to take data and run it through a pipe of functions to apply to it
 */
const { dec, gt, inc, lt, pipe, when } = require('kyanite')

// We can use a pipe as a form of logic branch as it passes the data from function to function
const check = pipe([
  when(lt(2), inc),
  when(gt(5), dec)
])

console.log(check(1)) // => 2
console.log(check(16)) // => 15
