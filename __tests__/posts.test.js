const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/utils/github');

describe('posts tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allow a user to post', async () => {
    await GithubUser.insert({
      username: 'bobbob',
      email: 'bob@bob.com',
      avatar: 'dontcare'
    });


    const expected = {
      id: expect.any(String),
      text: 'bobs tweet',
      email: 'bob@bob.com',
      username: 'bobbob'
    };
    
    const req = await request(app)
      .post('/api/v1/posts')
      .send({
        text: 'bobs tweet',
        email: 'bob@bob.com',
        username: 'bobbob'
      });

    expect(req.body).toEqual(expected);
  });

});
