const { Router } = require('express');
// const autheticate = require('../middleware/autheticate');
const fetch = require('cross-fetch');

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
    
    //2) Exchange code for token, 
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      })
    });
    const { token } = await tokenResp.json();

    console.log('TOKEN', token);

    // 3) Get user info from github using token
    const profileResp = await fetch('https://api.github.com/user', {
      headers : {
        Authorization: `token ${token}`
      }
    });

    const profile = await profileResp.json();

    console.log('PROFILE', profile);

    //4) fetch or create user profile
    let user = await GithubUser.findByEmail(login);

    if (!user) {
      user = await GithubUser.insert({
        email,
        username: login,
        avatar: avatar_url
      });
    }
  
    console.log('USER', user);
    //sign in

    res.send(user);

  });

// // GET /api/v1/github/verify
// .get('/verify', (req, res, next) => {
//   try {
//     res.send(req.user);
//   } catch (error) {
//     next(error);
//   }

// });
