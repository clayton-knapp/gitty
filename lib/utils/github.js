const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
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
  
  const { access_token } = await tokenResp.json();

  // console.log('TOKEN', access_token);

  return access_token;
};

const getGithubProfile = async (access_token) => {
  // 3) Get user info from github using token
  const profileResp = await fetch('https://api.github.com/user', {
    headers : {
      Accept: 'application/json',
      Authorization: `token ${access_token}`
    }
  });

  const profile = await profileResp.json();

  // console.log('PROFILE', profile);

  const newProfile = {
    username: profile.login,
    email: profile.email,
    avatar: profile.avatar_url
  };

  return newProfile;
  
};

module.exports = { exchangeCodeForToken, getGithubProfile };
