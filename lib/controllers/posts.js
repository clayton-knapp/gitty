const { Router } = require('express');


module.exports = Router()
  // POST /api/v1/posts
  .post('/', (req, res, next) => {
    try {
      null;
    } catch (error) {
      next(error);
    }
  });
