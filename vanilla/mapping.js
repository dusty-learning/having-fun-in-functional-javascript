/**
 * Mapping is a key piece of being able to use functional code
 * Elm has map functions attached to most of it's collection types,
 * Clojure allows you to map through any collection type easily, etc.
 *
 * In JavaScript we can only really map through Arrays which act as list collections
 * Though you can also Map through Sets, and the Map type if you break them down
 * It's important to note that Objects ARE NOT iterable types they are simply records not meant to be mapped through
 */

// With Array's it's pretty straight forward to map through them
console.log([1, 2, 3].map(x => x + 1)) // => [2, 3, 4]

// Now imagine using this with our curryable functions?
const add = a => b => a + b

console.log([1, 2, 3].map(add(1))) // => [2, 3, 4]

// Or even if we used it with a reduce?
// Note that I am making an auto curried function here

function multiply (a, b) {
  if (arguments.length === 1) {
    return function (_b) {
      return a * _b
    }
  }

  return a * b
}

const product = [1, 2, 3].reduce(multiply, 1)

console.log(product) // => 6
