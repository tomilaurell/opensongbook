/**
 *
 * ScrollDetector
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */

const DOWN = 0;
const UP = 1;
const treshold = 50;
const bottomTreshold = 20;
const topTreshold = 10;

const initialState = {
  direction: DOWN,
  startPosition: 0,
  lastPosition: 0,
  topReached: true,
  tresholdReached: false,
  bottomReached: false,
};

export function withOnScroll(WrappedComponent) {
  return class extends React.Component {
    state = initialState;

    constructor(props) {
      super(props);
      this.handleScroll = this.handleScroll.bind(this);
      this.scrollToTop = this.scrollToTop.bind(this);
      this.myRef = React.createRef();
    }

    scrollToTop() {
      const element = ReactDOM.findDOMNode(this);
      element.scrollTop = 1;
      this.setState(initialState);
    }

    handleScroll = (event, contentHeight) => {
      const {
        direction,
        startPosition,
        lastPosition,
        tresholdReached,
        bottomReached,
        topReached,
      } = this.state;

      const containerHeight = event.target.clientHeight;

      // If in the end, move 1 pixel to allow bounce
      let currentPosition = event.target.scrollTop;
      if (currentPosition === 0) {
        currentPosition = 1;
        event.target.scrollTop = currentPosition;
      } else if (containerHeight + currentPosition === contentHeight) {
        currentPosition -= 1;
        event.target.scrollTop = currentPosition;
      }

      const currentDirection = currentPosition - lastPosition > 0 ? DOWN : UP;

      const newState = {
        direction: currentDirection,
        startPosition,
        lastPosition: currentPosition,
        tresholdReached,
        bottomReached,
        topReached,
      };

      if (currentDirection !== direction) {
        newState.tresholdReached = false;
        newState.startPosition = currentPosition;
      } else if (currentDirection === UP) {
        if (!tresholdReached && startPosition - currentPosition > treshold) {
          // console.log('UP')
          newState.tresholdReached = true;
        }
      } else if (currentDirection === DOWN) {
        if (!tresholdReached && currentPosition - startPosition > treshold) {
          // console.log('DOWN')
          newState.tresholdReached = true;
        }
      }

      if (containerHeight + currentPosition > contentHeight - bottomTreshold) {
        if (!bottomReached) {
          // console.log('!!! bottomReached!!!')
          newState.bottomReached = true;
        }
      } else {
        if (bottomReached) {
          // Special case when we are at bossom at start to scroll up
          // console.log('special tresholdReached')
          newState.tresholdReached = true;
        }
        newState.bottomReached = false;
      }

      if (currentPosition < topTreshold) {
        if (!topReached) {
          // console.log('topReached currentPosition < topTreshold', currentPosition < topTreshold)
          newState.topReached = true;
        }
      } else {
        // console.log('newState.topReached = false')
        newState.topReached = false;
      }

      // console.log('newState', newState)

      this.setState(newState);
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      const {
        topReached,
        bottomReached,
        direction,
        tresholdReached,
      } = this.state;
      const showBars =
        topReached ||
        bottomReached ||
        (direction === UP && tresholdReached) ||
        (direction === DOWN && !tresholdReached);
      /*
      if (topReached)
        console.log('RESULT topReached', topReached)
      if (bottomReached)
        console.log('RESULT bottomReached', bottomReached)
      if (direction === UP && tresholdReached)
        console.log('RESULT direction === UP && tresholdReached', direction === UP && tresholdReached)
      if (direction === DOWN && !tresholdReached)
        console.log('RESULT direction === DOWN && !tresholdReached', direction === DOWN && !tresholdReached)
      */
      return (
        <WrappedComponent
          handleScroll={this.handleScroll}
          showBars={showBars}
          ref={this.myRef}
          scrollToTop={this.scrollToTop}
          {...this.props}
        />
      );
    }
  };
}
