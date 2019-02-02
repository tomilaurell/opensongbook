/**
 *
 * TopBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HomeIcon from 'components/icons/HomeIcon';
import BookIcon from 'components/icons/BookIcon';
import HelpIcon from 'components/icons/HelpIcon';

export const BOTTOM_BAR_HEIGHT = '40px';

export const MainContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  position: fixed;
  width: 100%;
  z-index: 10;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
`;

const IconWrapper = styled.div`
  width: 100%;
`;

const linkStyles = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: '#000000',
};

/* eslint-disable react/prefer-stateless-function */
class BottomBar extends React.Component {
  render() {
    const { showBars } = this.props;
    const mainContainerStyles = {
      height: showBars === true ? BOTTOM_BAR_HEIGHT : '0px',
      borderTop: showBars === true ? 'solid 2px #2b2b2b' : 'none',
      transition: '0.3s',
    };

    return (
      <MainContainer style={mainContainerStyles}>
        {showBars && (
          <Link to="/library" style={linkStyles}>
            <HomeIcon dimmed={this.props.currentPage !== 'library'} />{' '}
          </Link>
        )}
        {showBars && (
          <Link to="/book" style={linkStyles}>
            <BookIcon dimmed={this.props.currentPage !== 'book'} />{' '}
          </Link>
        )}
        {showBars && (
          <Link to="/info" style={linkStyles}>
            <HelpIcon dimmed={this.props.currentPage !== 'info'} />{' '}
          </Link>
        )}
      </MainContainer>
    );
  }
}

BottomBar.propTypes = {
  showBars: PropTypes.bool,
  currentPage: PropTypes.string.isRequired,
};

export default BottomBar;
