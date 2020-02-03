import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { StoreContext } from '../contex/repo/contex';
import StyledHeader from '../styledComponents/header';

function Header() {
  const { actions } = useContext(StoreContext);
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const MenuLinks = <><div className="navbar-nav flex-row w-100 NavLink">
    <li className="nav-item">
      <Link className="nav-link text-light" to="/repository">Repositories <span className="sr-only">(current)</span></Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light" to="/starts">Stars <span className="sr-only">(current)</span></Link>
    </li>
    <li onClick={() => actions.logout()} className={`nav-item${!isSmallScreen ? " ml-auto" : ""}`}>
      {/* eslint-disable-next-line no-script-url */}{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="nav-link text-light" href="javascript:void(0)">Logout <span className="sr-only">(current)</span></a>
    </li>
  </div>
  </>
  return (
    <div>
      <StyledHeader isSmallScreen={isSmallScreen}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="collapse navbar-collapse show" id="navbarSupportedContent">
            <ul className="navbar-nav flex-row w-100">
              {isSmallScreen && <div className="MobileHeader">
                {/* <img className="Logo" src="images/git-logo.jpeg" alt="logo" /> */}
                <img onClick={toggleNav} src="images/menu.png" alt="Unstar" />
              </div>}
              {
                isSmallScreen
                  ? isNavVisible && MenuLinks
                  : MenuLinks
              }
            </ul>
          </div>
        </nav>
      </StyledHeader>
    </div>
  )
}

export default Header;
