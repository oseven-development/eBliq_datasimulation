import { mapper } from './'

describe('getRandomInt', () => {
  test('mapper', done => {
    mapper().expect()
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject({ index: 'index' })
        done()
      })
  })
})
