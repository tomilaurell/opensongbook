/**
 *
 * Song
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Verse from 'components/Verse';
import SongIndexInput from 'components/SongIndexInput';
import ReactDOM from 'react-dom';
import { withOnScroll } from 'components/ScrollDetector';
import './modal.css';

export const ScrollingContainer = styled.div`
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  background-color: black;
  z-index: 0;
`;

export const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 60px;
  padding-bottom: 130px;
  min-height: calc(100vh + 2px);
  color: white;
  background-color: black;
  line-height: 25px;
  z-index: 0;
`;

export const VersesContainer = styled.div`
  align-self: center;
`;

export const IndexContainer = styled.div`
  align-self: center;
`;

export const IndexInput = styled.input`
  line-height: 60px;
  width: 150px;
  color: white;
  font-size: 50px;
  align-self: center;
`;

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.forwardScroll = this.forwardScroll.bind(this);
    this.myContentRef = React.createRef();
  }

  handleChangeSong = event => {
    if (event.target.value) {
      this.props.changeSong(event.target.value);
      event.target.value = '';
    }
  };

  componentDidMount() {
    this.props.scrollToTop();
  }

  componentDidUpdate(prevProps) {
    if (this.props.index && prevProps.index !== this.props.index) {
      this.props.scrollToTop();
    }
    if (prevProps.showBars !== this.props.showBars) {
      this.props.handleShowBars(this.props.showBars);
    }
  }

  forwardScroll = event => {
    const contentHeight = ReactDOM.findDOMNode(this.myContentRef.current)
      .clientHeight;
    this.props.handleScroll(event, contentHeight);
  };

  render() {
    const { verses, index, swipingHorizontally, userSettings } = this.props;
    const indexStyles = {
      fontSize: `${userSettings.fontSize * 1.5}px`,
    };
    const scrollingContainerStyles = {
      overflowY: swipingHorizontally ? 'hidden' : 'scroll',
    };
    return (
      <ScrollingContainer
        style={scrollingContainerStyles}
        onScroll={this.forwardScroll}
      >
        <SongContainer id="SongContainer" ref={this.myContentRef}>
          <SongIndexInput index={index} onBlur={this.handleChangeSong} />
          <VersesContainer>
            {verses.map(verse => (
              <Verse
                key={verse.index}
                userSettings={this.props.userSettings}
                {...verse}
              />
            ))}
          </VersesContainer>
        </SongContainer>
      </ScrollingContainer>
    );
  }
}

Song.propTypes = {
  changeSong: PropTypes.func.isRequired,
};

export default withOnScroll(Song);
