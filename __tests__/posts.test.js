const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('posts tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allow a user to post', async () => {
    const expected = {
      text: 'my tweet',
      email: 'bob@bob.com',
      username: 'bobbob'
    };
    
    const req = await request(app)
      .post('/api/v1/posts')
      .send({
        text: 'my tweet',
        email: 'bob@bob.com',
        username: 'bobbob'
      });

    expect(req.body).toEqual(expected);
  });

});
