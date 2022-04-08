const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


jest.mock('../lib/utils/github');


describe('quotes test', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // GET /api/v1/quotes gets 3 random quotes
  it('gets quotes', async () => {



    // //instead of inserting a user
    // // sign in using agent which hits signin endpoint and uses mocked user
    // const agent = request.agent(app);
    // await agent.get('/api/v1/github/login/callback'); //dont need to actually pass a code

    // //changed request(app) to agent to allow cookies
    // await agent
    //   .post('/api/v1/posts')
    //   .send({
    //     text: 'tweet 1',
    //     // email: 'bob@bob.com',
    //     // username: 'bobbob'
    //   });

    // //changed request(app) to agent to allow cookies
    // await agent
    //   .post('/api/v1/posts')
    //   .send({
    //     text: 'tweet 2',
    //     // email: 'bob@bob.com',
    //     // username: 'bobbob'
    //   });

    const expected = [
      { 
        author: expect.any(String),
        content: expect.any(String),
      },
      { 
        author: expect.any(String),
        content: expect.any(String),
      },
      { 
        author: expect.any(String),
        content: expect.any(String),
      },
    ];
    
    const req = await request(app)
      .get('/api/v1/quotes');

    expect(req.body).toEqual(expected);
  });

});
