import React from 'react';
import styled from 'styled-components'
import moment from 'moment'

const HeaderContainer = styled.div`
  padding: 30px 0px;
  text-align: center;
  color: white;
`

const Header: React.FC = () => {
  return (
    <HeaderContainer>
        <h1>Surfs Up</h1>
        <p>{moment().format('MMMM Do YYYY')}</p>
    </HeaderContainer>
  );
}

export default Header;