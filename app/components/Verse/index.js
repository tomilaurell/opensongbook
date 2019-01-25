/**
 *
 * Verse
 *
 */

import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sentence from 'components/Sentence';
import { ThemeContext } from 'components/ThemeContext';

export const MainContainer = styled.div`
  padding-top: 17px;
  text-align: left;
`;

export const IndexContainer = styled.div`
  color: white;
  text-align: center;
  font-size: 17px;
`;

function Verse({ index, sentences }) {
  const themeContext = useContext(ThemeContext);
  const styles = {
    fontSize: `${themeContext.fontSize}`,
  };
  return (
    <MainContainer style={styles}>
      {index !== 1 && <IndexContainer>{index}.</IndexContainer>}
      {sentences.map((text, sentenceIndex) => {
        const prefix = sentenceIndex === 0 ? `${index}.  ` : '';
        const key = `${index}.${sentenceIndex}`;
        return <Sentence key={key} text={text} />;
      })}
    </MainContainer>
  );
}

Verse.propTypes = {};

export default Verse;
