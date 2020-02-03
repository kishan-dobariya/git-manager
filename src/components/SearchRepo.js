import React, { useContext, useState, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';
import Button from '../styledComponents/button';
import Li from '../styledComponents/li';

function SearchRepo() {
  const [query, setQuery] = useState('');
  const { state: { searchedRepo, }, actions, } = useContext(StoreContext);

  useEffect(() => {
    if (query) actions.searchRepository({ query });
    else actions.clearSerachedResult();
  }, [query]);

  return (
    <div className="SearchWrapper">
      <div className="form-group position-relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="form-control"
          placeholder="Search Repo"
        />
        <ul className="list-group SearchResult bg-white">
          {
            searchedRepo.map((node, index) =>
              <Li key={index} className="RepoItem">
                <span>{node.nameWithOwner}</span>
                <Button onClick={() => actions.addStar({ id: node.id })}>
                  <img src="images/star.png" alt="Star" />
                  Star
                </Button>
              </Li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default SearchRepo;
