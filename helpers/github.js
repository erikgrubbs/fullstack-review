const request = require('request');
const config = require('../config.js');
const axios = require('axios');

let getReposByUsername = (user, callback) => {
  axios({
    method: 'get',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
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