// So what are the real advantages of creating tiny little functions
// Like our add for instance?
function add (a, b) {
  return a + b
}

// Well now you suddenly have a re useable higher order function that you can now use!
// Or to compose together even more functions
function sum (nums) {
  return nums.reduce(add)
}

console.log(sum([1, 2, 3])) // => 6
