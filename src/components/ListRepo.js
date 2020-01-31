import React, { useContext, } from 'react';

import { StoreContext } from '../contex/repo/contex';

function ListRepo() {
  const { state: { starredRepositories, }, actions, } = useContext(StoreContext);

  return (
    <ul className="list-group">
      {
        starredRepositories.map((edge, index) =>
          <li key={index} className="list-group-item RepoItem"><span>{edge.node.name}</span><button onClick={() => actions.removeStar({ id: edge.node.id })} className="btn btn-primary btn-sm">Unstar</button></li>
        )
      }
    </ul>
  )
}

export default ListRepo;
