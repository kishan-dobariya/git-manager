import React, { useContext, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';

function OwnRepoList() {
  const { state: { ownRepoList, }, actions, } = useContext(StoreContext);

  useEffect(() => {
    actions.getRepositoryList();
  }, []);


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
