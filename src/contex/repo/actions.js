import { get } from 'lodash';

import {
  REPO_LIST, STARRED_REPO_LIST, SEARCH_REPO,
  ADD_STAR, REMOVE_STAR
} from '../../utils/Queries';
import { client } from "../../utils/Apollo";

const types = {
  GET_OWN_REPO_LIST: "GET_OWN_REPO_LIST",
  SET_OWN_REPO_LIST: "SET_OWN_REPO_LIST",
  GET_STARRED_REPO_LIST: "GET_STARRED_REPO_LIST",
  SET_STARRED_REPO_LIST: "SET_STARRED_REPO_LIST",
  GET_SEARCHED_REPO_LIST: "GET_SEARCHED_REPO_LIST",
  SET_SEARCHED_REPO_LIST: "SET_SEARCHED_REPO_LIST",
  CHANGE_COMPONENT: "CHANGE_COMPONENT",
  REMOVE_REPO_BY_ID: "REMOVE_REPO_BY_ID",
  CHANGE_AUTH: "CHANGE_AUTH",
  GET_AUTH: "GET_AUTH",
};

const useActions = (state, dispatch) => {

  const getRepositoryList = async () => {
    try {
      const res = await client.query({
        query: REPO_LIST,
        fetchPolicy: 'no-cache'
      });
      const list = get(res, 'data.viewer.repositories.edges', []);
      return dispatch({ type: types.SET_OWN_REPO_LIST, payload: list });
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const getStarredRepositoryList = async () => {
    try {
      const res = await client.query({
        query: STARRED_REPO_LIST,
        fetchPolicy: 'no-cache'
      });
      const list = get(res, 'data.viewer.starredRepositories.edges', []);
      return dispatch({ type: types.SET_STARRED_REPO_LIST, payload: list });
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const searchRepository = async (variables) => {
    try {
      const res = await client.query({
        query: SEARCH_REPO,
        variables,
        fetchPolicy: 'no-cache'
      });
      const list = get(res, 'data.search.nodes', []);
      return dispatch({ type: types.SET_SEARCHED_REPO_LIST, payload: list });
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const addStar = async (variables) => {
    try {
      const res = await client.mutate({
        mutation: ADD_STAR,
        variables,
      });
      if (get(res, 'data.addStar.starrable.id', '') === variables.id)
        getStarredRepositoryList();
      dispatch({ type: types.SET_SEARCHED_REPO_LIST, payload: [] });
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const removeStar = async (variables) => {
    try {
      const res = await client.mutate({
        mutation: REMOVE_STAR,
        variables,
      });
      if (get(res, 'data.removeStar.starrable.id', '') === variables.id)
        return dispatch({ type: types.REMOVE_REPO_BY_ID, payload: variables.id });
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const changeAuth = () => {
    dispatch({ type: types.CHANGE_AUTH, });
  }

  const clearSerachedResult = () => {
    dispatch({ type: types.SET_SEARCHED_REPO_LIST, payload: [], });
  }

  const changeComponent = (number) => {
    dispatch({ type: types.CHANGE_COMPONENT, payload: number, });
  }

  const getAuth = async (code) => {
    try {
      const res = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_CLIENT_ID}&&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&&code=${code}`, { //&redirect_uri=http://localhost
        method: 'POST',
        mode: 'cors',
        headers: { Accept: 'application/json' },
      }).then(resp => resp.json());

      const token = get(res, 'access_token', '');
      if (token) {
        localStorage.setItem("token", res.access_token);
        dispatch({ type: types.CHANGE_AUTH });
        dispatch({ type: types.GET_OWN_REPO_LIST });
        dispatch({ type: types.GET_STARRED_REPO_LIST });
        window.location.href = window.location.href.split('login?code=')[0];
      }
    } catch (error) {
      alert(error.message);
    }
    return;
  }

  const logout = () => {
    localStorage.removeItem('token');
    return dispatch({ type: types.CHANGE_AUTH });
  }

  return {
    getRepositoryList,
    getStarredRepositoryList,
    searchRepository,
    addStar,
    removeStar,
    logout,
    getAuth,
    changeAuth,
    changeComponent,
    clearSerachedResult,
  };

};

export { useActions, types }
