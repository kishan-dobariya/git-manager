import React from 'react';
import { get } from 'lodash';

import ListRepo from './components/ListRepo';
import OwnRepoList from './components/OwnRepo';
import SearchRepo from './components/SearchRepo';
import Auth from './components/Auth';
import Header from './components/Header';
import { getStarredRepoList, removeStart, searchRepoList, addStart, getAuthToken, getOwnRepoList, } from './Utils/git';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentFlag: 1,
      starredRepositories: [],
      ownRepoList: [],
      searchedRepo: [],
      query: '',
      isAuth: false,
    };
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ isAuth: true });
      this.getStarredRepositoryList();
      this.getOwnRepositoryList();
    } else if (window.location.href.split('?code=').length === 2)
      await this.changeAuth(window.location.href.split('?code=')[1]);
  }

  changeAuth = async (code) => {
    try {
      const res = await getAuthToken(code);
      localStorage.setItem("token", res.access_token);
      this.setState({ isAuth: true });
      await this.getStarredRepositoryList();
      await this.getOwnRepositoryList();
      window.location.href = window.location.href.split('?code=')[0];
    } catch (error) {
      if (error.message === 'Failed to fetch') alert('Please add any cors extension and enable cors using https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf ');
      else alert(error.message);
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ isAuth: false });
  }

  changeComponent = (flag) => this.setState({ componentFlag: flag });

  getStarredRepositoryList = async () => {
    try {
      const res = await getStarredRepoList();
      this.setState({ starredRepositories: get(res, 'data.viewer.starredRepositories.edges', []) });
    } catch (error) {
      alert(error.message);
    }
  }

  getOwnRepositoryList = async () => {
    try {
      const res = await getOwnRepoList();
      this.setState({ ownRepoList: get(res, 'data.viewer.repositories.edges', []) });
    } catch (error) {
      alert(error.message);
    }
  }

  searchRepo = async (query) => {
    try {
      this.setState({ query });
      const res = await searchRepoList({ query });
      this.setState({ searchedRepo: get(res, 'data.search.nodes', []) });
    } catch (error) {
      alert(error.message);
    }
  }

  addStartFromRepo = async (id) => {
    try {
      const res = await addStart({ id });
      if (get(res, 'data.addStar.starrable.id', '') === id) {
        this.setState({ query: '', searchedRepo: [] });
        this.getStarredRepositoryList();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  removeStartFromRepo = async (id) => {
    const { starredRepositories } = this.state;
    try {
      const res = await removeStart({ id });
      if (get(res, 'data.removeStar.starrable.id', '') === id)
        this.setState({ starredRepositories: starredRepositories.filter(edge => edge.node.id !== id) });
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const { starredRepositories, isAuth, componentFlag, query, searchedRepo, ownRepoList, } = this.state;

    return (
      <div className="MainContainer">
        {
          !isAuth && <Auth />
        }
        {isAuth && <Header logout={this.logout} changeComponent={this.changeComponent} />}
        {
          isAuth && componentFlag === 1 && <div className="container">
            <div className="mx-auto col-lg-5 col-md-7 mt-lg-5 mt-4">
              <OwnRepoList ownRepoList={ownRepoList} />
            </div>
          </div>
        }
        {
          isAuth && componentFlag === 2 && <div className="container">
            <div className="mx-auto col-lg-5 col-md-7 mt-lg-5 mt-4">
              <SearchRepo addStartFromRepo={this.addStartFromRepo} className="col-md-6 col-sm-12" searchedRepo={searchedRepo} getRepositoryList={this.getStarredRepositoryList} searchRepo={this.searchRepo} query={query} />
              <ListRepo key={Math.random()} className="col-md-6 col-sm-12" removeStartFromRepo={this.removeStartFromRepo} repositories={starredRepositories} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
