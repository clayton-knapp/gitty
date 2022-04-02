const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');


module.exports = class GithubUserService {
  static async create(code) {

    // //2) Exchange code for token
    const access_token = await exchangeCodeForToken(code);

    // console.log('TOKEN', access_token);

    // // 3) Get user info from github using 
    const profile = await getGithubProfile(access_token);

    const { username, email, avatar } = profile;

    // console.log('PROFILE', profile);

    //4) fetch or create user profile
    let user = await GithubUser.findByUsername(username);

    if (!user) {
      user = await GithubUser.insert({
        username,
        email,
        avatar,
      });
    }

    // console.log('USER', user);

    return user;
  }
};
