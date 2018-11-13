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
  align-self: center;
`;

function FontIcon() {
  return (
    <MainContainer>
      <Icon name="font" style={{ fontSize: '18px' }} />
      <Icon name="font" style={{ marginLeft: '-13px', fontSize: '13px' }} />
    </MainContainer>
  );
}

FontIcon.propTypes = {};

export default FontIcon;
