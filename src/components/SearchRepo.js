import React from 'react';

function SearchRepo({ query, addStartFromRepo, searchRepo, searchedRepo }) {
  return (
    <div className="SearchWrapper">
      <div className="form-group position-relative">
        <input
          type="text"
          value={query}
          onChange={e => searchRepo(e.target.value)}
          className="form-control"
          placeholder="Search Repo"
        />
        <ul className="list-group SearchResult">
          {
            searchedRepo.map((node, index) => <li key={index} className="list-group-item RepoItem"><span>{node.nameWithOwner}</span><button onClick={() => addStartFromRepo(node.id)} className="btn btn-primary btn-sm">Star</button></li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default SearchRepo;
