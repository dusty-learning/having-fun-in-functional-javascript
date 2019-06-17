
/**
 * Composing functions is probably one of the easiest things you can do in JavaScript
 * In fact I bet you already do it
 */
const inc = a => a + 1
const double = a => a * 2

// Composition is just taking the results of a function, and giving it to another function
console.log(inc(double(2))) // => 5

/**
 * It's common to take this approach and apply it to it's own function setup.
 * Commonly compose functions execute from right to left.
 */
const compose = (fn, gn, a) => fn(gn(a))

console.log(compose(inc, double, 2)) // => 5

// Now imagine if we made compose curried? We could create our own function combinations.
const compose2 = (fn, gn) => a => fn(gn(a))
const incDouble = compose2(inc, double)

console.log(incDouble(2)) // => 5

// The important bit of information here is the compose is executing from right to left
// So first it takes the number, doubles it, and THEN is increments it by 1
