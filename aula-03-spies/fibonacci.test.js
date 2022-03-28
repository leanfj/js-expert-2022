const sinon = require("sinon")
const { deepStrictEqual } = require("assert")
const Fibonacci = require('./src/fibonacci')

  ;
(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    for await (const i of fibonacci.execute(3)) { }

    //Algoritmo sempre começa do zero
    const expectedCallCount = 4

    deepStrictEqual(spy.callCount, expectedCallCount)

  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)

    const { args } = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParamas = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    deepStrictEqual(args, expectedParamas)
    deepStrictEqual(results, expectedResult)
  }
})()