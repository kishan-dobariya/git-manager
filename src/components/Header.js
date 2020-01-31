import React, { useContext, } from 'react';

import { StoreContext } from '../contex/repo/contex';

function Header() {
  const { actions } = useContext(StoreContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse show" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row w-100">
          <div className="navbar-nav flex-row w-100">
            <li onClick={() => actions.changeComponent(1)} className="nav-item ">
              {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link text-light" href="javascript:void(0)">Repositories <span className="sr-only">(current)</span></a>
            </li>
            <li onClick={() => actions.changeComponent(2)} className="nav-item ">
              {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link text-light" href="javascript:void(0)">Stars <span className="sr-only">(current)</span></a>
            </li>
          </div>
          <li onClick={() => actions.logout()} className="nav-item ml-auto">
            {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link text-light" href="javascript:void(0)">Logout <span className="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;
