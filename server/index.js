const express = require('express');
const {save, retrieveAllRepos} = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');
const sortByForks = require('../helpers/sort.js')
const bodyParse = require('body-parser');

let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }))

app.post('/repos', function ({body}, res) {
  // TODO - your code here!
  getReposByUsername(body.user, (err, repos) => {
    if (err){
      console.error(err);
      res.status(404).send('Unable to add repos');
      return;
    }
    repos.forEach((repo) => {
      save(repo);
    })
    res.status(201).send('Successfully added non duplicate repos');
  })
});

app.get('/repos', function (req, res) {
  retrieveAllRepos((err, repos) => {
     if(err) {
       res.status(400).send('Unable to retrieve repos')
       return;
      }
     repos = sortByForks(repos);
     res.status(200).send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

