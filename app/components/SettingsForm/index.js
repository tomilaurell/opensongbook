/**
 *
 * Input
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import { ThemeContext } from 'components/ThemeContext';
import RangeInput from 'components/RangeInput';

const MainContainer = styled.div`
  color: white;
  padding-left: 10px;
  padding-right: 10px;
`;

function SettingsForm() {
  const themeContext = useContext(ThemeContext);
  const { fontSize, setFontSize } = themeContext;

  return (
    <MainContainer>
      <RangeInput
        label="Text Size"
        value={fontSize}
        onChange={setFontSize}
        valuePostfix="px"
      />
    </MainContainer>
  );
}

SettingsForm.propTypes = {};

export default SettingsForm;
