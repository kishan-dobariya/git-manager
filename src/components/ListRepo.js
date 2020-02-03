import React, { useContext, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';
import SearchRepo from '../components/SearchRepo';
import Li from '../styledComponents/li';
import Button from '../styledComponents/button';

function ListRepo() {
  const { state: { starredRepositories, }, actions, } = useContext(StoreContext);

  useEffect(() => {
    actions.getStarredRepositoryList();
  }, []);

  return (
    <>
      <SearchRepo className="col-md-6 col-sm-12" />
      <ul className="list-group">
        {
          starredRepositories.map((edge, index) =>
            <Li key={index} className="list-group-item RepoItem">
              <span>{edge.node.name}</span>
              <Button onClick={() => actions.removeStar({ id: edge.node.id })}>
                <img src="images/star.png" alt="Unstar" />
                Unstar
              </Button>
            </Li>
          )
        }
      </ul>
    </>
  )
}

export default ListRepo;
