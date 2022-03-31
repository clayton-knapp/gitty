const { Router } = require('express');
// const autheticate = require('../middleware/autheticate');

module.exports = Router()
  // GET /api/v1/github/login
  .get('/login', (req, res) => {
    //Redirect to Githubs authorization endpoint

  })

  //GET /api/v1/github/login/callback
  .get('/login/callback', (req, res, next) => {
    //Exchange code for token, create user profile sign in

  })

  // GET /api/v1/github/verify
  .get('/verify', authenticate, (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }

  });