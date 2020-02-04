import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { StoreContext } from '../contex/repo/contex';

function LogOut({ isSmallScreen }) {
  const { actions } = useContext(StoreContext);
  const history = useHistory();

  const logout = () => {
    actions.logout();
    history.push("/")
  }

  return (
    <li onClick={logout} className={`nav-item${!isSmallScreen ? " ml-auto" : ""}`}>
      {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="nav-link text-light" href="javascript:void(0)">Logout <span className="sr-only">(current)</span></a>
    </li>
  )
}

export default LogOut;
