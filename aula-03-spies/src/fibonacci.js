class Fibonacci {
  *execute (input, current = 0, next = 1) {
    // console.count('execute!!')
    if (input === 0) {
      return 0
    }
    //retorna valor
    yield current
    //delega o retorno para a execução do function
    yield* this.execute(input - 1, next, current + next)
  }
}
module.exports = Fibonacci