/**
 *
 * SongIndexInput
 *
 */

import React from 'react';
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

/* eslint-disable react/prefer-stateless-function */
class SongIndexInput extends React.Component {
  render() {
    const { onBlur, index } = this.props;
    return (
      <IndexInput
        id="changeSongInput"
        type="number"
        onBlur={onBlur}
        placeholder={index}
      />
    );
  }
}

SongIndexInput.propTypes = {
  index: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
};

export default SongIndexInput;
