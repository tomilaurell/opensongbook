/**
 *
 * TrashIcon
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const MainContainer = styled.div`
  align-self: center;
  font-size: 18px;
`;

function TrashIcon(props) {
  const styles = {
    color: '#ffffff',
  };
  return (
    <MainContainer style={styles} {...props}>
      <Icon name="trash" />
    </MainContainer>
  );
}

export default TrashIcon;
