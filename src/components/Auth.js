import React, { Component } from 'react';

class Auth extends Component {
  render() {
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
}

export default Auth;
