const { readFile } = require('fs/promises')
const { error } = require('./constants')
const User = require('./user')

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}

class File {
  static async csvToJson (filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)

    if (!validation.valid) {
      throw new Error(validation.error)
    }

    const users = File.parseCSVToJSON(content)

    return users
  }

  static async getFileContent (filePath) {
    return (await readFile(filePath)).toString('utf8')
  }

  static isValid (csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeders] = csvString.split('\n')
    const isHeaderValid = header === options.fields.join(',')

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }
    const isContentLengthAccepted = (
      fileWithoutHeders.length > 0 &&
      fileWithoutHeders.length <= options.maxLines
    )

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return { valid: true }
  }

  static parseCSVToJSON (csvString) {
    //Separando em um novo array por linha identificando o enter
    const lines = csvString.split('\n')
    //Remover o primeiro item do array [0] onde esta o header
    const firstLine = lines.shift()
    //Transforma em um novo array identificando o separado ,
    const header = firstLine.split(',')
    //Lines tem todas as linhas restantes da string separadas em array
    const users = lines.map(line => {
      //Para cada linha do array cria um novo array identificando o separador ,
      const columns = line.split(',')
      let user = {}

      //para cada item da coluna associa com um item de header e para cada linha que é um item
      for (const index in columns) {
        user[header[index]] = columns[index]
      }

      return new User(user)
    })

    return users
  }
}

module.exports = File