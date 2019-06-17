/**
 * Currying also known as partial application, is a way in functional programming
 * of setting up functions to accept data, making them far easier to pipe, map, reduce, etc. through your code.
 */

// It's simply a function that returns another function for each parameter
// This is known as manual currying the most straight forward and easy to use approach
function add (a) {
  return function (b) {
    return a + b
  }
}

// Here is the same type of function but using ES6 syntax
const subtract = a => b => a - b
// With ES6 it lines up a bit better with similarities to lambdas

// Now let's use our functions
console.log(add(1)(2)) // => 3

const add2 = add(2)

console.log(add2(1)) // => 3
console.log(add2(2)) // => 4

console.log(subtract(2)(1)) // => 1

const sub2 = subtract(2)

console.log(sub2(2)) // => 0
console.log(sub2(1)) // => 1
