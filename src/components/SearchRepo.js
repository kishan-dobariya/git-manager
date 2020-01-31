import React, { useContext, useState, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';

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
        <ul className="list-group SearchResult">
          {
            searchedRepo.map((node, index) => <li key={index} className="list-group-item RepoItem"><span>{node.nameWithOwner}</span><button onClick={() => actions.addStar({ id: node.id })} className="btn btn-primary btn-sm">Star</button></li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default SearchRepo;
