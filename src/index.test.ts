const request = require('supertest')
const app = require('./index')

describe('Test a 200', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ index: 'index' })
        done()
      })
  })

  //   test('BookRoute', async () => {
  //     request(app)
  //       .get('/')
  //       //   .expect('Content-Type', /json/)
  //       .expect('Content-Length', '5')
  //       .expect(200, 'index')
  //       .end(function(err, res) {
  //         console.log(res)
  //         if (err) throw err
  //       })
  //   })
})
