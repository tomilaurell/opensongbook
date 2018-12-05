/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import SettingsForm from 'components/SettingsForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const MainContainer = styled.div`
  background-color: black;
  height: 100vh;
  widht: 100vw;
`;

const TitleContainer = styled.div`
  position: fixed;
  top: 0px;
  background-color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  border-bottom: solid 2px #2b2b2b;
`;

const TitleText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const BackLinkContainer = styled.div`
  float: left;
  bottom: 20px;
  position: relative;
  left: 10px;
`;

const BackLink = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  margin-top: 100px;
  width: 100vw;
  padding: 5px;
`;

export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
  }

  handleFontSizeChange(fontSize) {
    console.log('handleFontSizeChange', fontSize);
  }

  render() {
    return (
      <MainContainer>
        <TitleContainer>
          <TitleText>Settings</TitleText>
          <BackLinkContainer>
            <Link to="/book">
              <BackLink>Ready</BackLink>
            </Link>
          </BackLinkContainer>
        </TitleContainer>
        <ContentContainer>
          <SettingsForm />
        </ContentContainer>
      </MainContainer>
    );
  }
}

SettingsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
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

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
