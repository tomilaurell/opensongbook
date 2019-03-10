/**
 *
 * FontIcon
 *
 */

import React from 'react';
import styled from 'styled-components';
const YourSvg = require('./endOfSong_icon.svg');

export const MainContainer = styled.div`
  align-self: center;
`;

export default function EndOfSongIcon() {
  const styles = {
    marginTop: '20px',
    width: '35%',
    border: 'none',
  };
  return (
    <MainContainer>
      <img src={YourSvg} alt="" style={styles} />
    </MainContainer>
  );
}
