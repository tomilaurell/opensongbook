/**
 *
 * FontIcon
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const MainContainer = styled.div`
  color: #ffffff;
  font-size: 18px;
  display: flex;
`;

export const IconContainer = styled.div`
  align-self: center;
`;

function SearchIcon() {
  return (
    <MainContainer>
      <IconContainer>
        <Icon name="search" />
      </IconContainer>
    </MainContainer>
  );
}

SearchIcon.propTypes = {};

export default SearchIcon;
