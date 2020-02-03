import styled from 'styled-components';

const Header = styled.header`
  .NavLink {
    display: ${props => props.isSmallScreen ? 'grid !important' : ''};
  }
  .navbar-nav {
    display: ${props => props.isSmallScreen ? 'grid !important' : ''};
    transition: .3s all;
  }
  .MobileHeader {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .Logo {
    width: 41px;
    background: transparent;
  }
`;

export default Header;
