/**
 *
 * TopBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontIcon from 'components/icons/FontIcon';
import SearchIcon from 'components/icons/SearchIcon';

export const TOP_BAR_EXPAND_HEIGHT = '40px';
export const TOP_BAR_COLLAPSE_HEIGHT = '20px';

export const MainContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 0px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: solid 2px #2b2b2b;
`;

export const TitleContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  align-self: center;
  font-weight: bold;
`;

/* eslint-disable react/prefer-stateless-function */
class TopBar extends React.Component {
  render() {
    const { title, showBars } = this.props;

    const mainContainerStyles = {
      height: showBars ? TOP_BAR_EXPAND_HEIGHT : TOP_BAR_COLLAPSE_HEIGHT,
      justifyContent: showBars ? 'space-between' : 'center',
      transition: '0.3s',
    };

    const titleContainerStyles = {
      fontSize: showBars ? '16px' : '13px',
      transition: '0.3s',
    };

    return (
      <MainContainer style={mainContainerStyles}>
        {showBars && <SearchIcon />}
        <TitleContainer style={titleContainerStyles}>{title}</TitleContainer>
        {showBars && <FontIcon />}
      </MainContainer>
    );
  }
}

TopBar.propTypes = {};

export default TopBar;
