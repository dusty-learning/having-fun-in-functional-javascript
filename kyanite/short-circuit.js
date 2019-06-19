/**
 * Any function that uses Kyanites built in reduce are able to be short circuited using Kyanites reduced function.
 * This allows you to prevent an entire iteration from happening if you need to prevent it.
 */
const { compose, dec, gt, inc, lt, pipe, reduce, reduced, when } = require('kyanite')

const data = [1, 2, 3, 4, 5]

// This reduce once it reaches an item in the array that is greater than three,
// Stops iterating and returns the accumulator as it currently is
console.log(reduce((item, acc) =>
  item > 3 ? reduced(acc) : acc.concat(item), [], data)) // => [1, 2, 3]

// Once the accumulator has a total of 3 items in it the reduce stops and returns it.
console.log(reduce((item, acc) =>
  acc.length === 3 ? reduced(acc) : acc.concat(item * 2), [], data)) // => [2, 4, 6]

// This reduced even works with our pipe friend!
// Because under the hood, pipe is using Kyanite reduce to do the thing!
// For readability purposes I am going to set the function to a constant
// This will act as our short circuit of the function
const done = compose(reduced)
const check = pipe([
  when(lt(10), done(inc)),
  when(gt(10), done(dec))
])

console.log(check(20)) // => 19
console.log(check(1)) // => 2
console.log(check(10)) // => 10
