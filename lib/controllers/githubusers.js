const { Router } = require('express');
// const autheticate = require('../middleware/autheticate');
const fetch = require('cross-fetch');
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
    
    // //2) Exchange code for token, 
    // const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     client_id: process.env.CLIENT_ID,
    //     client_secret: process.env.CLIENT_SECRET,
    //     code
    //   })
    // });
    // const { access_token } = await tokenResp.json();

    const access_token = exchangeCodeForToken(code);

    console.log('TOKEN', access_token);

    // // 3) Get user info from github using token
    // const profileResp = await fetch('https://api.github.com/user', {
    //   headers : {
    //     Accept: 'application/json',
    //     Authorization: `token ${access_token}`
    //   }
    // });

    // const profile = await profileResp.json();

    const profile = getGithubProfile(access_token);
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

    // 5 create our jwt/cookie
    const token = jwt.sign(
      { ...user },
      process.env.JWT_SECRET,
      { expiresIn: '1 day' }
    );

    // 6 attach our cookie to our response
    res.cookie(
      process.env.COOKIE_NAME,
      token,
      {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      }
    );

    // 7 Redirect user to posts/tweets
    res.send(user);
    // res.redirect('/api/v1/github/verify');
    // res.redirect('/api/v1/posts');

  })

// GET /api/v1/github/verify
  .get('/verify', (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }

  });
