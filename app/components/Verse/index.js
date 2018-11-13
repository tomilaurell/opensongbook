/**
 *
 * Verse
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sentence from 'components/Sentence';

export const MainContainer = styled.div`
  padding-top: 17px;
  text-align: left;
`;

export const IndexContainer = styled.div`
  color: white;
  text-align: center;
  font-size: 17px;
`;

function Verse({ index, sentences, userSettings }) {
  const styles = {
    fontSize: `${userSettings.fontSize}px`,
  };
  return (
    <MainContainer style={styles}>
      {index !== 1 && <IndexContainer>{index}.</IndexContainer>}
      {sentences.map((text, sentenceIndex) => {
        const prefix = sentenceIndex === 0 ? `${index}.  ` : '';
        const key = `${index}.${sentenceIndex}`;
        return <Sentence key={key} text={text} userSettings={userSettings} />;
      })}
    </MainContainer>
  );
}

Verse.propTypes = {};

export default Verse;
