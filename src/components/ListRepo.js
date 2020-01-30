import React from 'react';

function ListRepo({ repositories, removeStartFromRepo }) {
  return (
    <ul className="list-group">
      {
        repositories.map((edge, index) =>
          <li key={index} className="list-group-item RepoItem"><span>{edge.node.name}</span><button onClick={() => removeStartFromRepo(edge.node.id)} className="btn btn-primary btn-sm">Unstar</button></li>
        )
      }
    </ul>
  )
}


export default ListRepo;
