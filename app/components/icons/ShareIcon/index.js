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
`;

function ShareIcon() {
  return (
    <MainContainer>
      <Icon name="share square" />
    </MainContainer>
  );
}

ShareIcon.propTypes = {};

export default ShareIcon;
