const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  // POST /api/v1/posts
  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);

      res.send(post);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async(req, res, next) => {
    try {
      const posts = await Post.getAllPosts();

      res.send(posts);
    } catch (error) {
      next(error);
    }

  });
