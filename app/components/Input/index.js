/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const MainContainer = styled.div``;

function MyInput({ value = '', placeholder, onChange, ...rest }) {
  return (
    <MainContainer {...rest}>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </MainContainer>
  );
}

MyInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default MyInput;
