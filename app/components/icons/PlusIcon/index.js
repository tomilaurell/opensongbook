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

function PlusIcon(props) {
  return (
    <MainContainer>
      <Icon name="plus" {...props} />
    </MainContainer>
  );
}

PlusIcon.propTypes = {};

export default PlusIcon;
