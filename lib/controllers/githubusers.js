const { Router } = require('express');
// const autheticate = require('../middleware/autheticate');
// const fetch = require('cross-fetch');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  // GET /api/v1/github/login
  .get('/login', (req, res) => {
    // Redirect to Githubs authorization endpoint
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
    

  })

//GET /api/v1/github/login/callback
  .get('/login/callback', async(req, res, next) => {
    // 1) get the code from query params
    const { code } = req.query;

    console.log('CODE', code);
    
    // //2) Exchange code for token
    const access_token = await exchangeCodeForToken(code);

    console.log('TOKEN', access_token);

    // // 3) Get user info from github using 
    const profile = await getGithubProfile(access_token);

    const { username, email, avatar } = profile;

    console.log('PROFILE', profile);

    //4) fetch or create user profile
    let user = await GithubUser.findByUsername(username);

    if (!user) {
      user = await GithubUser.insert({
        username,
        email,
        avatar,
      });
    }
  
    console.log('USER', user);

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
    // res.redirect('/api/v1/github/verify');
    res.redirect('/api/v1/posts');

  })

  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });

// GET /api/v1/github/verify
// .get('/verify', (req, res, next) => {
//   try {
//     res.send(req.user);
//   } catch (error) {
//     next(error);
//   }

// });
