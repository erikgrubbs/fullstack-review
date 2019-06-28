const sortByForks = (repos) => {
  repos.sort((a,b) => {
    return b.forks - a.forks;
  })
  return repos.slice(0, 25);
}

module.exports = sortByForks;