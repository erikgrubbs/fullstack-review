import React from 'react';
import Repo from './Repo.jsx';
const RepoList = (props) => {
  if (props.repos.length) {
    return (
      <div>
        <div className="top25">These guys are SO forked.</div>
        {props.repos.map((repo, i) => (
          <Repo repo={repo} key={i} />
        ))}
      </div>
    )
  } else {
    return (
      <div>No Repos</div>
    )
  }
}

  export default RepoList;