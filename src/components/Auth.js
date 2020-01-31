import React, { useContext, useEffect, } from 'react';

import { StoreContext } from '../contex/repo/contex';

function Auth() {
  const { actions, } = useContext(StoreContext);

  useEffect(() => {
    if (window.location.href.split('?code=').length === 2) {
      actions.getAuth(window.location.href.split('?code=')[1]);
    }
  }, []);

  return (
    <div className="AuthWrapper">
      <button type="button" className="btn btn-primary">
        <a className="AuthLink" href={`https://github.com/login/oauth/authorize?client_id=32643f5c08582c341db3&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user:email,public_repo,repo`}>
          Login with githhub
          </a>
      </button>
    </div>
  );
}

export default Auth;
