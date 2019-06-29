const conformNewRepo = (repo) => {
  newRepo = {};
  newRepo.forks = repo.forks;
  newRepo.repoName = repo.name;
  newRepo.repoId = repo.id;
  newRepo.repoUrl = repo.html_url;
  newRepo.description = repo.description;
  newRepo.watchers = repo.watchers;
  newRepo.ownerName =  repo.owner.login;
  newRepo.ownerUrl = repo.owner.html_url;
  newRepo.ownerPhoto = repo.owner.avatar_url;
  return newRepo;
}

module.exports = conformNewRepo;