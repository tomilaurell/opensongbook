/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RangeInput } from 'grommet';
import './rangeInput.css';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LabelContainer = styled.div`
  color: white;
  white-space: nowrap;
  font-size: 17px;
`;

const RangeContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
`;

const LineContainer = styled.div`
  height: 0px;
  border-bottom: 7px solid #353535;
  position: relative;
  bottom: 9px;
`;

const ValueContainer = styled.div`
  color: white;
  font-size: 18px;
`;

function MyRangeInput({ label, value, onChange, valuePostfix }) {
  return (
    <MainContainer>
      <LabelContainer>{label}</LabelContainer>
      <RangeContainer>
        <RangeInput
          style={{ zIndex: 100, height: '100%' }}
          value={value}
          min={10}
          max={30}
          step={1}
          onChange={event => onChange(event.target.value)}
        />
        <LineContainer />
      </RangeContainer>
      <ValueContainer>{`${value}${valuePostfix}`}</ValueContainer>
    </MainContainer>
  );
}

MyRangeInput.propTypes = {};

export default MyRangeInput;
