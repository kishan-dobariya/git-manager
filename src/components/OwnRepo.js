import React from 'react';

function OwnRepoList({ ownRepoList }) {
  return (
    <div>
      <ul className="list-group">
        {
          ownRepoList.map((edge, index) =>
            <li key={index} className="list-group-item RepoItem">
              <span>{edge.node.name}</span>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default OwnRepoList;
