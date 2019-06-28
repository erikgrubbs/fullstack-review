const sortByForks = (repos) => {
  repos.sort((a,b) => {
    return b.forks - a.forks;
  })
  return repos.slice(0, 26);
}

module.exports = sortByForks;