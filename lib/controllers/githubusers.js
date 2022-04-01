const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
// const fetch = require('cross-fetch');
// const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
// const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');
const GithubUserService = require('../services/GithubUserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  // GET /api/v1/github/login
  .get('/login', (req, res) => {
    // Redirect to Githubs authorization endpoint
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
    

  })

//GET /api/v1/github/login/callback
  .get('/login/callback', async(req, res, next) => {
    try {
      // 1) get the code from query params
      const { code } = req.query;
  
      // console.log('CODE', code);
      
      //UserService handles following
      // 2) Exchange code for token
      // 3) Get user info from github 
      // 4) fetch or create user profile
      const user = await GithubUserService.create(code);
    
      // console.log('USER', user);
  
      // 5 create our jwt/token
      const token = jwt.sign(
        { ...user },
        process.env.JWT_SECRET,
        { expiresIn: '1 day' }
      );
  
      // 6 attach our jwt token to the cookie in the response
      res.cookie(
        process.env.COOKIE_NAME,
        token,
        {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS
        }
      );
  
      // 7 Redirect user to posts/tweets
      
      // res.send(user);
      res.redirect('/api/v1/posts');
      
    } catch (error) {
      next(error);
    }

  })

  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  })

// GET /api/v1/auth/verify
  .get('/verify', authenticate, (req, res, next) => {
    res.send(req.user);
  });

