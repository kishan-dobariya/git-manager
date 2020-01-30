import { gql } from "apollo-boost";

import { client } from "./Apollo";

export const getAuthToken = (code) => {
  return fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_CLIENT_ID}&&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&&code=${code}`, { //&redirect_uri=http://localhost
    method: 'POST',
    mode: 'cors',
    headers: { Accept: 'application/json' },
  }).then(resp => resp.json());
}

export const getStarredRepoList = () => {
  const REPO_LIST = gql`
    query {
      viewer {
        login
        name
        starredRepositories(first: 20) {
          edges {
            cursor
            node {
              id
              name
              primaryLanguage {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  `;
  return client.query({
    query: REPO_LIST,
    fetchPolicy: 'no-cache'
  });
}

export const getOwnRepoList = () => {
  const REPO_LIST = gql`
    query {
      viewer {
        login
        name
        repositories(first: 20) {
          edges {
            node {
              name
              updatedAt
              description
              homepageUrl
            }
          }
        }
      }
    }
  `;
  return client.query({
    query: REPO_LIST,
    fetchPolicy: 'no-cache'
  });
}

export const searchRepoList = (variables) => {
  const SEARCH_REPO = gql`
    query topRepos($query: String!) {
      search(first: 10, query: $query, type: REPOSITORY) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            id
            nameWithOwner
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `;
  return client.query({
    query: SEARCH_REPO,
    variables,
  });
}

export const addStart = (variables) => {
  const ADD_STAR = gql`
  mutation($id: String!) {
    addStar(input:{starrableId: $id} ){
      starrable {
        id
      }
    }
  }`;

  return client.mutate({
    mutation: ADD_STAR,
    variables,
  });
}

export const removeStart = (variables) => {
  const REMOVE_STAR = gql`
  mutation($id: String!) {
    removeStar(input:{starrableId: $id} ){
      starrable {
        id
      }
    }
  }`;

  return client.mutate({
    mutation: REMOVE_STAR,
    variables,
  });
}
