/**
 * Currying also known as partial application or Closures, is a way in functional programming
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

/**
 * Now with manual currying you have that problem where you need to call the function for each parameter
 * Which isn't a terrible thing and is fine in 80% of cases.
 * However what if we setup some auto currying functions?
 */
const multiply = function (a, b) {
  if (arguments.length === 1) {
    return function (_b) {
      return a * _b
    }
  }

  return a * b
}
// It's important to note that I used the function keyword above, without that the `arguments.length` would not work
// Now with the above we can take advantage of multiple ways of calling it
console.log(multiply(2, 2))
console.log(multiply(2)(2))

const double = multiply(2)

console.log(double(2)) // => 4
console.log(double(3)) // => 6

/**
 * What if we take it a step further, and build a function
 * that automatically turns another into a curried function?
 *
 * This curry2 function allows us to take any functions that takes 2 parameters and automatically make it a curried function.
 */
function curry2 (fn) {
  return function f2 (a, b) {
    // If no arguments are present then just return the function
    if (!arguments.length) {
      return f2
    }

    // If only 1 argument is given, return a new function expecting the 2nd
    if (arguments.length === 1) {
      return function (_b) {
        return fn(a, _b)
      }
    }

    // If both arguments are provided then just call the function right away
    return fn(a, b)
  }
}

// Now we can use the curry2 function on any function with 2 params we have to create a new curried version
const maths = {
  add: curry2((a, b) => a + b),
  subtract: curry2((a, b) => a - b),
  multiply: curry2((a, b) => a * b),
  divide: curry2((a, b) => a / b)
}

// Now we have a little maths object of curried functions!
const data = [1, 2, 3]

console.log('Maths add:', data.reduce(maths.add, 0))
console.log('Maths subtract:', data.reduce(maths.subtract, 0))
console.log('Maths Multiply:', data.reduce(maths.multiply, 1))
console.log('Maths Divide:', data.reduce(maths.divide, 1))

// Nifty right? We can do this for however many parameters!
// We can even make one that automatically handles any amount of parameters!
const curry = (f, ...args) => {
  // If the functions needed arguments are less than or equal to the amount provided
  // Then just call the function with the arguments
  if (f.length <= args.length) {
    return f(...args)
  }

  // Otherwise return a new function that is waiting for the rest of the arguments
  // And recursively return
  return (...rest) => curry(f, ...args, ...rest)
}

/**
 * This function allows for us to curry a function with any amount of params!
 * So why use something like curry2 Vs just this curry function?
 * Well mostly performance, if you're using a lot of functions **together** that rely on the curry function above
 * You might notice some performance degrading. While specifying the amount of params would be much faster
 * Under the hood Kyanite uses the curry2, curry3, curry4 method. But offers a curry function for one off instances.
 */
