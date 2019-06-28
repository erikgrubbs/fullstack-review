const express = require('express');
const {save, retrieveAllRepos} = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');
const sortByForks = require('../helpers/sort.js')
const Conform = require('../helpers/format.js')
const bodyParse = require('body-parser');
const morgan = require('morgan');

let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }))
app.use(morgan('dev'));

let _repos = [];

app.post('/repos', function ({body}, res) {
  getReposByUsername(body.user, (err, repos) => {
    if (err){
      console.error(err);
      res.status(404).send('Unable to add repos');
      return;
    }
    repos.forEach((repo) => {
      save(repo);
      _repos.push(Conform(repo));
    })
    console.log(_repos.length);
    _repos = sortByForks(_repos);
    res.status(201).send(_repos);
  })
});

app.get('/repos', function (req, res) {
  retrieveAllRepos((err, repos) => {
     if(err) {
       res.status(400).send('Unable to retrieve repos')
       return;
      }
     repos = sortByForks(repos);
     _repos = repos.slice();
     res.status(200).send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

