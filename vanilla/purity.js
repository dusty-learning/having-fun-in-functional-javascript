
// add is a pure function because it always gives the same output
// When given the same inputs.
function add (a, b) {
  return a + b
}

console.log(add(1, 1)) // => 2
console.log(add(1, 1)) // => 2
console.log(add(1, 1)) // => 2

// It also never produces any side effects
const c = 1
const d = 1

console.log(add(c, d)) // => 2
console.log(c, d) // => 1 1

// Functions like Math.max are also pure because
// Like our add, given the same input, it always produces the same output
// And it produces no side effects
Math.max(1, 8, 6) // => 8
const e = 8
const f = 6

console.log(Math.max(d, e, f)) // => 8
console.log(d, e, f) // => 1 8 6

// Those are simple examples of purity, but what about a more complex setup, like an Object?
// These are a real threat since it's so easy to mutate by reference
const cartOne = {
  items: [],
  totalItems: 0,
  totalCost: 0
}

// This is an impure function that adds to our cart
function addToCart (state, item, quantity) {
  state.items.push({ item, quantity })
  state.totalItems += quantity
  state.totalCost += item.cost * quantity

  return state
}

// If we call this function it will fully mutate our cartOne constant
addToCart(cartOne, { name: 'Paper Clip', cost: 1 }, 5)
console.log(cartOne)
/**
 * Output:
 * {
 *  items: [{
 *   item: { name: 'Paper Clip', cost: 1 },
 *   quantity: 5
 *  }],
 *   totalItems: 5,
 *   totalCost: 5
 *  }
 */

// If anything was relying on a piece of cartOne's data it will have to adjust accodingly
// All while the developer has to make sure this has no serious impact on the rest of the app
// Let's try a more Functional approach
const cartTwo = {
  items: [],
  totalItems: 0,
  totalCost: 0
}

function addToCartFP (state, item, quantity) {
  return {
    items: state.items.concat([{ item, quantity }]),
    totalItems: state.totalItems + quantity,
    totalCost: state.totalCost + item.cost * quantity
  }
}

console.log(addToCartFP(cartTwo, { name: 'Paper Clip', cost: 1 }, 5))
/**
 * Output:
 * {
 *  items: [{
 *   item: { name: 'Paper Clip', cost: 1 },
 *   quantity: 5
 *  }],
 *   totalItems: 5,
 *   totalCost: 5
 *  }
 */
console.log(cartTwo) // => { items: [], totalItems: 0, totalCost: 0 }
