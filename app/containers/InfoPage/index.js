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
import Button from 'components/Button';
import makeSelectInfoPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const MainContainer = styled.div`
  background-color: black;
  height: 100vh;
  widht: 100vw;
`;

export const TitleContainer = styled.div`
  position: fixed;
  top: 0px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  border-bottom: solid 2px #2b2b2b;
`;

export const ContentContainer = styled.div`
  margin-top: 40px;
  height: calc(100vh - 40px - 40px);
  background-color: black;
  color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const AppNameContainer = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
`;

export const UpdateSectionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
`;

export const TextContainer = styled.div`
  text-align: center;
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  width: 100px;
  align-self: center;
  margin-top: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
export class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateApp = this.updateApp.bind(this);
  }

  updateApp() {
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
        alert('Restart the app to finish update');
      },
      onUpdateFailed: () => {
        console.log('SW Event:', 'onUpdateFailed');
      },
    });
  }

  render() {
    return (
      <MainContainer>
        <TitleContainer>Info</TitleContainer>
        <ContentContainer>
          <AppNameContainer>Open Songbook</AppNameContainer>
          <UpdateSectionContainer>
            <TextContainer>
              To update to app just click the following button and restart the
              app.
            </TextContainer>
            <ButtonContainer>
              <Button value="Update!" onClick={this.updateApp} />
            </ButtonContainer>
          </UpdateSectionContainer>
        </ContentContainer>
        <BottomBar currentPage="info" showBars />
      </MainContainer>
    );
  }
}

InfoPage.propTypes = {};

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
