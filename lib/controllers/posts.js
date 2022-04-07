const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  // POST /api/v1/posts
  .post('/', authenticate, (req, res, next) => {
    Post.insert({
      ...req.body,
      username: req.user.username,
      email: req.user.email,
    })
      .then((post) => res.send(post))
      .catch((error) => next(error));
  })

  .get('/', authenticate,(req, res, next) => {
    Post.getAllPosts()
      .then((posts) => res.send(posts))
      .catch((error) => next(error));

  });
