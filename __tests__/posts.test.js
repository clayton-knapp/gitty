const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const GithubUser = require('../lib/models/GithubUser');
// const GithubUserService = require('../lib/services/GithubUserService');

jest.mock('../lib/utils/github');


//REFACTOR TO GET RID OF MIDDLEWARE MOCK
// jest.mock('../lib/middleware/authenticate.js', () => (req, res, next) => {
//   req.user = {
//     username: 'bobbob',
//     email: 'bob@bob.com',
//     avatar: 'https://placebear.com/200/300'
//   };

//   next();
// });

describe('posts tests', () => {
  beforeEach(() => {
    return setup(pool);
    // .then(() => GithubUserService.create('fake code'));
  });

  afterAll(() => {
    pool.end();
  });

  it('allow a user to post', async () => {
    // await GithubUser.insert({
    //   username: 'bobbob',
    //   email: 'bob@bob.com',
    //   avatar: 'https://placebear.com/200/300'
    // });

    //instead of inserting a user
    // sign in using agent which allows cookies and hits signin endpoint and should use mocked user
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback'); //dont need to pass actual code b/c mocked


    const expected = {
      id: expect.any(String),
      text: 'this is a fake tweet',
      username: 'fake_github_user',
      email: 'not-real@example.com',
    };
    
    //changed request(app) to agent to allow cookies
    const req = await agent
      .post('/api/v1/posts')
      .send({
        text: 'this is a fake tweet',
      });

    expect(req.body).toEqual(expected);
  });



  // GET /api/v1/posts lists all posts for all users
  it('gets posts from all users', async () => {
    // await GithubUser.insert({
    //   username: 'bobbob',
    //   email: 'bob@bob.com',
    //   avatar: 'https://placebear.com/200/300'
    // });


    //instead of inserting a user
    // sign in using agent which hits signin endpoint and uses mocked user
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback'); //dont need to actually pass a code

    //changed request(app) to agent to allow cookies
    await agent
      .post('/api/v1/posts')
      .send({
        text: 'tweet 1',
        // email: 'bob@bob.com',
        // username: 'bobbob'
      });

    //changed request(app) to agent to allow cookies
    await agent
      .post('/api/v1/posts')
      .send({
        text: 'tweet 2',
        // email: 'bob@bob.com',
        // username: 'bobbob'
      });

    const expected = [
      { 
        id: expect.any(String),
        text: 'tweet 1',
        username: 'fake_github_user',
        email: 'not-real@example.com',
      },
      { 
        id: expect.any(String),
        text: 'tweet 2',
        username: 'fake_github_user',
        email: 'not-real@example.com',
      }
    ];
    
    //changed request(app) to agent to allow cookies
    const req = await agent
      .get('/api/v1/posts');

    expect(req.body).toEqual(expected);
  });

});
