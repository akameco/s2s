function greet(name: string) {
  return `hello ${name}`
}

for (var i = 1; i < 10; i++) {
  console.log(
    i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i
  )
}
