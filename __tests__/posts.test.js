const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allow a user to post', async () => {
    const req = await request(app)
      .post('/api/v1/posts')
      .send('')

    expect(req.body).toEqual();
  });

});
