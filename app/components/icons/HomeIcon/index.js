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
  font-size: 18px;
  align-self: center;
`;

function HomeIcon({ dimmed }) {
  const styles = {
    color: dimmed ? '#7c7c7c' : '#ffffff',
  };

  return (
    <MainContainer style={styles}>
      <Icon name="home" />
    </MainContainer>
  );
}

HomeIcon.propTypes = {};

export default HomeIcon;
