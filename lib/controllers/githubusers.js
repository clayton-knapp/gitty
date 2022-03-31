const { Router } = require('express');
// const autheticate = require('../middleware/autheticate');

module.exports = Router()
  // GET /api/v1/github/login
  .get('/login', (req, res) => {
    // Redirect to Githubs authorization endpoint
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
    

  })

//GET /api/v1/github/login/callback
  .get('/login/callback', (req, res, next) => {
  //Exchange code for token, 
  
    //create user profile 
  
    //sign in

  });

// // GET /api/v1/github/verify
// .get('/verify', (req, res, next) => {
//   try {
//     res.send(req.user);
//   } catch (error) {
//     next(error);
//   }

// });
