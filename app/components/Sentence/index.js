/**
 *
 * Sentence
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

export const MainContainer = styled.div``;

function Sentence({ text }) {
  return (
    <MainContainer>
      <span>{text}</span>
    </MainContainer>
  );
}

Sentence.propTypes = {};

export default Sentence;
