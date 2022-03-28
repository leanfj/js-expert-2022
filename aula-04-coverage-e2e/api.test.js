const { deepStrictEqual, ok } = require('assert')
const { describe, it } = require("mocha")
const request = require('supertest')
const app = require("./api")

describe('API Test Suit', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact').expect(200)

      deepStrictEqual(response.text, 'Contatos')
    })
  })

  describe('/login', () => {
    it('should login succesfully on te login route and return HTTP Status 200', async () => {
      const response = await request(app).post('/login').send({ userName: 'Leandro', password: '123' }).expect(200)

      deepStrictEqual(response.text, 'Login succeeded!')
    })
    it('should unauthorized a request when requesting it using wrong credentials and return HTTP status 401', async () => {
      const response = await request(app).post('/login').send({ userName: 'Leonardo', password: '1234' }).expect(401)

      ok(response.unauthorized)
      deepStrictEqual(response.text, 'Login Failed!')
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to default route', async () => {
      const response = await request(app).get('/hi').expect(200)

      deepStrictEqual(response.text, 'Hello World')
    })
  })
})