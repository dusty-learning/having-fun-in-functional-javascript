
/**
 * Kyanite makes composing functionality super easy, by working well together
 * but also because you get access to a direct compose function within Kyanite!
 */
const K = require('kyanite')

// We've already seen how currying works in that every function is curried through kyanite
// But when that's not enough you have extra tools to help you get the job done!
const nameIsBob = K.compose(K.eq('Bob'), K.prop('name'))
const howManyLeft = K.compose(K.length, K.filter(nameIsBob))

const data = [
  { name: 'Billy' },
  { name: 'Foop' },
  { name: 'Bob' },
  { name: 'George' },
  { name: 'Bob' }
]

console.log('There are', howManyLeft(data), 'left') // => 'There are 2 left'

/**
 * So we used compose to make our own functions that were also already curried out of the box for us to use!
 * You can even do this with your own custom functions
 */
const tackOnThings = a => b => a + b + ' Things'
const doAThing = K.compose(tackOnThings('There are '), K.length)

console.log(doAThing('abc')) // => 'There are 3 Things'

// The possibilities are pretty huge when it comes to composing your functionality
