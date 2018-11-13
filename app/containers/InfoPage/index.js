/**
 *
 * InfoPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BottomBar from 'components/BottomBar';
import makeSelectInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const MainContainer = styled.div``;

/* eslint-disable react/prefer-stateless-function */
export class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateApp = this.updateApp.bind(this);
  }

  updateApp() {
    console.log('updateApp');
    const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require
    // require('offline-plugin/runtime').install(); // eslint-disable-line global-require
    runtime.install({
      onUpdating: () => {
        console.log('SW Event:', 'onUpdating');
      },
      onUpdateReady: () => {
        console.log('SW Event:', 'onUpdateReady');
        // Tells to new SW to take control immediately
        runtime.applyUpdate();
      },
      onUpdated: () => {
        console.log('SW Event:', 'onUpdated');
        // Reload the webpage to load into the new version
        // window.location.reload();
      },
      onUpdateFailed: () => {
        console.log('SW Event:', 'onUpdateFailed');
      },
    });
  }

  render() {
    return (
      <MainContainer>
        <button type="button" onClick={this.updateApp}>Update!</button>
        <BottomBar currentPage="info" showBars />
      </MainContainer>
    );
  }
}

InfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  infoPage: makeSelectInfoPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'infoPage', reducer });
const withSaga = injectSaga({ key: 'infoPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InfoPage);
