/**
 *
 * Input
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import { ThemeContext } from 'components/ThemeContext';

const MainContainer = styled.div`
  color: white;
`;

const fontSizeOptions = [
  {
    text: '14px',
    value: '14px',
  },
  {
    text: '16px',
    value: '16px',
  },
  {
    text: '18px',
    value: '18px',
  },
  {
    text: '20px',
    value: '20px',
  },
  {
    text: '22px',
    value: '22px',
  },
  {
    text: '24px',
    value: '24px',
  },
];

function SettingsForm() {
  const themeContext = useContext(ThemeContext);
  const { fontSize, setFontSize } = themeContext;
  console.log('themeContext', themeContext);

  return (
    <MainContainer>
      <Dropdown
        placeholder="Select font size"
        fluid
        selection
        options={fontSizeOptions}
        value={fontSize}
        onChange={(event, { value }) => setFontSize(value)}
      />
    </MainContainer>
  );
}

SettingsForm.propTypes = {};

export default SettingsForm;
