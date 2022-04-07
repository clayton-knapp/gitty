const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: 
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      })
  })
    .then((tokenResp) => {
      return tokenResp.json();
    });

};

const getGithubProfile = (access_token) => {
  // 3) Get user info from github using token
  fetch('https://api.github.com/user', {
    headers : {
      Accept: 'application/json',
      Authorization: `token ${access_token}`
    }
  })
    .then((profileResp) => {
      return profileResp.json();
    })
    .then((profile) => {
      const newProfile = {
        username: profile.login,
        email: profile.email,
        avatar: profile.avatar_url
      };
    
      return newProfile;
    });



  // // 3) Get user info from github using token
  // const profileResp = await fetch('https://api.github.com/user', {
  //   headers : {
  //     Accept: 'application/json',
  //     Authorization: `token ${access_token}`
  //   }
  // });

  // const profile = await profileResp.json();

  // // console.log('PROFILE', profile);

  // const newProfile = {
  //   username: profile.login,
  //   email: profile.email,
  //   avatar: profile.avatar_url
  // };

  // return newProfile;
  
};

module.exports = { exchangeCodeForToken, getGithubProfile };
