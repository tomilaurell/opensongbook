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
  align-self: center;
`;

function ChevronIcon({ direction }) {
  return (
    <MainContainer>
      <Icon name={`chevron ${direction}`} />
    </MainContainer>
  );
}

ChevronIcon.propTypes = {};

export default ChevronIcon;
