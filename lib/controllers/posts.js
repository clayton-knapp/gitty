const { Router } = require('express');


module.exports = Router()
  // POST /api/v1/posts
  .post('/', (req, res, next) => {
    try {
      const post = {
        text: 'my tweet',
        email: 'bob@bob.com',
        username: 'bobbob'
      };

      res.send(post);
    } catch (error) {
      next(error);
    }
  });
