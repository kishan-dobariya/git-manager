import React, { useContext, useEffect, } from 'react';

import { StoreContext } from './contex/repo/contex';
import ListRepo from './components/ListRepo';
import OwnRepoList from './components/OwnRepo';
import SearchRepo from './components/SearchRepo';
import Auth from './components/Auth';
import Header from './components/Header';
import './App.scss';

function App() {
  const { state, actions } = useContext(StoreContext);
  const { isAuth, componentFlag, } = state;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      actions.changeAuth();
      actions.getRepositoryList();
      actions.getStarredRepositoryList();
    } else if (window.location.href.split('?code=').length === 2)
      actions.getAuth(window.location.href.split('?code=')[1]);
  }, []);

  return (
    <div className="MainContainer">
      {
        !isAuth && <Auth />
      }
      {isAuth && <Header />}
      {
        isAuth && componentFlag === 1 && <div className="container">
          <div className="mx-auto col-lg-5 col-md-7 mt-lg-5 mt-4">
            <OwnRepoList />
          </div>
        </div>
      }
      {
        isAuth && componentFlag === 2 && <div className="container">
          <div className="mx-auto col-lg-5 col-md-7 mt-lg-5 mt-4">
            <SearchRepo className="col-md-6 col-sm-12" />
            <ListRepo className="col-md-6 col-sm-12" />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
