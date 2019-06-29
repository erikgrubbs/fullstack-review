const request = require('request');
const config = process.env.TOKEN || require('../config.js').TOKEN;
const axios = require('axios');

let getReposByUsername = (user, callback) => {
  axios({
    method: 'get',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config}`
    }
  })
  .then(({data}) => {
    if (data.length === 0) {
      throw "User has no repos";
    }
    callback(null, data);
  })
  .catch((err) =>  callback(err));
}

module.exports = getReposByUsername;