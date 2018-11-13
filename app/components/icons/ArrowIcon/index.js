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
  color: #353535;
  font-size: 28px;
  align-self: center;
`;

function ArrowIcon({ direction }) {
  return (
    <MainContainer>
      <Icon name={`arrow alternate circle ${direction}`} />
    </MainContainer>
  );
}

ArrowIcon.propTypes = {};

export default ArrowIcon;
