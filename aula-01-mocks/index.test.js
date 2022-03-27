const File = require("./src/file")
const { rejects, deepStrictEqual } = require('assert')
const { error } = require("./src/constants")
  ;
(async () => {

  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expectd = [
      {
        "name": "Leandro Ferreira",
        "id": 123,
        "profession": "JavaScript Developer",
        "birthDay": 1986
      },
      {
        "name": "Leonardo Ferreira",
        "id": 124,
        "profession": "Java Developer",
        "birthDay": 2000
      },
      {
        "name": "Carlos Ferreira",
        "id": 125,
        "profession": "C# Developer",
        "birthDay": 1978
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expectd))
  }
})()