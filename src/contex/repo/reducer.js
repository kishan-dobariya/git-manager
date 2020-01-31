import { types } from './actions';

const initialState = {
  componentFlag: 1,
  starredRepositories: [],
  ownRepoList: [],
  searchedRepo: [],
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OWN_REPO_LIST:
      return { ...state, ownRepoList: [...action.payload] };
    case types.SET_STARRED_REPO_LIST:
      return { ...state, starredRepositories: [...action.payload] };
    case types.SET_SEARCHED_REPO_LIST:
      return { ...state, searchedRepo: [...action.payload] };
    case types.REMOVE_REPO_BY_ID:
      return { ...state, starredRepositories: state.starredRepositories.filter(repo => repo.node.id !== action.payload) };
    case types.CHANGE_AUTH:
      return { ...state, isAuth: !state.isAuth };
    case types.CHANGE_COMPONENT:
      return { ...state, componentFlag: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
