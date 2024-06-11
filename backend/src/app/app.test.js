const basePathVersion = require('../utils/api/basePath')
const request = require('supertest')
const app = require('./app')
const { closeDB } = require('../config/database')

describe('App', () => {
  let server

  beforeAll(async () => {
    server = await new Promise((resolve, reject) => {
      const s = app.listen(4002, (err) => {
        if (err) reject(err)
        else resolve(s)
      })
    })
  }, 20000)

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
  }, 20000)

  it('should respond with a 200 status code on the root path', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/html/)
  }, 20000)

  it('should respond with a 404 status code for an unknown route', async () => {
    const response = await request(app).get('/unknown-route')
    expect(response.statusCode).toBe(404)
  }, 20000)

  it('should respond with a 200 status code on /api/v1/users path', async () => {
    const response = await request(app).get(`${basePathVersion}/users`)
    expect(response.statusCode).toBe(200)
  }, 20000)
})
