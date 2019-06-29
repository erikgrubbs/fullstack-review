const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher'
mongoose.connect(uri, { useMongoClient: true });




let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: Number,
  repoName: String,
  repoUrl: String,
  description: String,
  ownerName: String,
  ownerUrl: String,
  ownerPhoto: String,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('repo', repoSchema);

let save = ({ id, name, owner, html_url, description, forks, watchers }) => {
  return Repo.find({ repoId: id }, (err, result) => {
    if (result[0]) {
      console.log("user already added");
      return "user already added";
    } else {
      var repo = new Repo({
        repoId: id,
        repoName: name,
        repoUrl: html_url,
        description,
        forks,
        watchers,
        ownerName: owner.login,
        ownerUrl: owner.html_url,
        ownerPhoto: owner.avatar_url
      });
      repo.save((err, repo) => {
        if (err) return console.error(err);
        console.log('saved');
      })
    }
  })
}

const retrieveAllRepos = (callback) => {
  Repo.find().lean().exec({}, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  }
  )
}


module.exports = {
  save,
  retrieveAllRepos
}

