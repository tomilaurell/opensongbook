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
`;

function ShareIcon(props) {
  return (
    <MainContainer>
      <Icon name="share alternate" {...props} />
    </MainContainer>
  );
}

ShareIcon.propTypes = {};

export default ShareIcon;
