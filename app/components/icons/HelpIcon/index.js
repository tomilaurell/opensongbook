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
  align-self: center;
  font-size: 18px;
`;

function HelpIcon({ dimmed }) {
  const styles = {
    color: dimmed ? '#7c7c7c' : '#ffffff',
  };
  return (
    <MainContainer style={styles}>
      <Icon name="help" />
    </MainContainer>
  );
}

HelpIcon.propTypes = {};

export default HelpIcon;
