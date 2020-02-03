import React, { useContext, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';
import Li from '../styledComponents/li';

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
            <Li key={index} className="list-group-item RepoItem">
              <span>{edge.node.name}</span>
            </Li>
          )
        }
      </ul>
    </div>
  );
}

export default OwnRepoList;
