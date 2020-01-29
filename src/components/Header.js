import React from 'react';

function Header({ changeComponent, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse show" id="navbarSupportedContent">
        <ul className="navbar-nav flex-row w-100">
          <div className="navbar-nav flex-row w-100">
            <li onClick={() => changeComponent(1)} className="nav-item ">
              {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link text-light" href="javascript:void(0)">Repositories <span className="sr-only">(current)</span></a>
            </li>
            <li onClick={() => changeComponent(2)} className="nav-item ">
              {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link text-light" href="javascript:void(0)">Stars <span className="sr-only">(current)</span></a>
            </li>
          </div>
          <li onClick={logout} className="nav-item ml-auto">
            {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link text-light" href="javascript:void(0)">Logout <span className="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;
