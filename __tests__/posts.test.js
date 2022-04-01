const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');
const res = require('express/lib/response');

jest.mock('../lib/utils/github');

jest.mock('../lib/middleware/authenticate.js', () => (req, res, next) => {
  req.user = {
    username: 'bobbob',
    email: 'bob@bob.com',
    avatar: 'https://placebear.com/200/300'
  };

  next();
});

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
      avatar: 'https://placebear.com/200/300'
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



  // GET /api/v1/posts lists all posts for all users
  it('gets posts from all users', async () => {
    await GithubUser.insert({
      username: 'bobbob',
      email: 'bob@bob.com',
      avatar: 'https://placebear.com/200/300'
    });

    const expected = [
      { text: 'tweeting is fun' },
      { text: 'tweeting is whatever' }
    ];
    
    const req = await request(app)
      .get('/api/v1/posts');

    expect(req.body).toEqual(expected);
  });

});
