/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

function MyButton({ value, ...rest }) {
  return (
    <Button secondary {...rest}>
      {value}
    </Button>
  );
}

MyButton.propTypes = {
  value: PropTypes.string.isRequired,
};

export default MyButton;
