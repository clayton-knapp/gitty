const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');


module.exports = class GithubUserService {
  static create(code) {

    // declare githubProfile variable in more global scope so it is accessible by multiple .then chains
    let githubProfile;
    // //2) Exchange code for token
    return exchangeCodeForToken(code)
    // // 3) Get user info from github using 
      .then((access_token) => getGithubProfile(access_token))
      //4) fetch or create user profile
      .then((profile) => {
        githubProfile = profile;
        return GithubUser.findByUsername(profile.username);
      })
      //if no user profile then create one
      .then((user) => {
        if (!user) {
          return GithubUser.insert(githubProfile);
        }
        else {
          return user;
        }
      });

  
  }
};
