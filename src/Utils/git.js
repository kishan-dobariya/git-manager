import { gql } from "apollo-boost";

import { client } from "./Apollo";

export const getAuthToken = (code) => {
  return fetch(`https://github.com/login/oauth/access_token?client_id=32643f5c08582c341db3&&client_secret=ea6cc5d7c6b493573f682e037419f7f13b7d64fc&&code=${code}`, { //&redirect_uri=http://localhost
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
