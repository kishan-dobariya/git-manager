import { gql } from "apollo-boost";

export const REPO_LIST = gql`
  query {
    viewer {
      login
      name
      repositories(first: 30) {
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

export const STARRED_REPO_LIST = gql`
  query {
    viewer {
      login
      name
      starredRepositories(first: 30) {
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

export const SEARCH_REPO = gql`
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

export const ADD_STAR = gql`
  mutation($id: String!) {
    addStar(input:{starrableId: $id} ){
      starrable {
        id
      }
    }
}
`;

export const REMOVE_STAR = gql`
  mutation($id: String!) {
    removeStar(input:{starrableId: $id} ){
      starrable {
        id
      }
    }
  }
`;