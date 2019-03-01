/**
 *
 * SongIndexInput
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IndexInput = styled.input`
  align-self: center;
  color: white;
  text-align: center;
  font-size: 30px;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  ::placeholder {
    color: white;
    opacity: 1;
  }

  &:focus {
    line-height: 60px;
    width: 150px;
    font-size: 50px;
    text-align: left;
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
  }
`;

const onKeyPress = inputEl => e => {
  if (e.key === 'Enter') {
    inputEl.current.blur();
  }
};

/* eslint-disable react/prefer-stateless-function */
function SongIndexInput({ onBlur, index }) {
  const inputEl = useRef(null);
  return (
    <IndexInput
      id="changeSongInput"
      ref={inputEl}
      type="number"
      onBlur={onBlur}
      onKeyPress={onKeyPress(inputEl)}
      placeholder={index}
    />
  );
}

SongIndexInput.propTypes = {
  index: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
};

export default SongIndexInput;
