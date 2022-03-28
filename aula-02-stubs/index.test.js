const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const Service = require('./src/service')
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"

const mocks = {
  planet1: require('./mocks/planet-1.json'),
  planet2: require('./mocks/planet-2.json')
}
  ;
(async () => {
  //Consumindo da API
  /*  const service = new Service()
  const withouStub = await service.makeRequest(BASE_URL_2)
  console.log(JSON.stringify(withouStub)) */

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(mocks.planet1)
  stub.withArgs(BASE_URL_2).resolves(mocks.planet2)

  {
    const expected = { name: 'Tatooine', surfaceWater: '1', appearedIn: 5 }
    const result = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(result, expected)
  }
  {
    const expected = { name: 'Alderaan', surfaceWater: '40', appearedIn: 2 }
    const result = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(result, expected)

  }

})()