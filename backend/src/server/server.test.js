const request = require('supertest')
const app = require('../app/app')
const { closeDB } = require('../config/database')

describe('Server', () => {
  let server

  beforeAll(async () => {
    server = await new Promise((resolve) => {
      const s = app.listen(4000, () => resolve(s))
    })
  })

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve))
    await closeDB()
  })
  it('should respond with a 200 status code on the root path', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  }, 10000)
})
