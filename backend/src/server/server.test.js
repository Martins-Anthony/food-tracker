const request = require('supertest')
const app = require('../app/app')
const { closeDB } = require('../config/database')

describe('Server', () => {
  let server

  beforeAll(async () => {
    server = await new Promise((resolve, reject) => {
      const s = app.listen(4001, (err) => {
        if (err) reject(err)
        else resolve(s)
      })
    })
  }, 10000)

  afterAll(async () => {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err)
          else resolve()
        })
      })
    }
    await closeDB()
  }, 10000)
  it('should respond with a 200 status code on the root path', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  }, 10000)
})
