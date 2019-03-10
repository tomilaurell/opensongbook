/**
 *
 * Sentence
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'components/ThemeContext';

export const MainContainer = styled.div``;

function Sentence({ text }) {
  const themeContext = useContext(ThemeContext);
  const styles = {
    lineHeight: `${themeContext.fontSize * 1.3}px`,
  };
  return (
    <MainContainer style={styles}>
      <span>{text}</span>
    </MainContainer>
  );
}

export default Sentence;
