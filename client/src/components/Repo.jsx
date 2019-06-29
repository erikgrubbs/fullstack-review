import React from 'react';

const Repo = ({ repo }) => (
  <div className="repoDiv">
    <div className="repoName"> <a className="repoLink" href={repo.repoUrl} target="_blank">{repo.repoName}</a>
    </div>
    <div className="info">
      <span className="owner"><img className="ownerImage" src={repo.ownerPhoto}></img><a className="ownerName" href={repo.ownerUrl}>{repo.ownerName}</a></span>
      <div className="description">{repo.description}</div>
      <span className="forksnwatch">{`FORKS: ${repo.forks}  watchers: ${repo.watchers}`}</span>

    </div>
  </div>
);

export default Repo;