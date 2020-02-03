import styled from 'styled-components';

const Button = styled.button`
  color: #24292e;
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);

  position: relative;
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-repeat: repeat-x;
  background-position: -1px -1px;
  background-size: 110% 110%;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
  -webkit-appearance: none;
`;

export default Button;
