const { Router } = require('express');
const Post = require('../models/Post');


module.exports = Router()
  // POST /api/v1/posts
  .post('/', async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);

      res.send(post);
    } catch (error) {
      next(error);
    }
  });
