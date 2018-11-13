/**
 *
 * SongPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SongBook from 'components/SongBook';
import { fetchBook } from './actions';
import { makeSelectBook } from './selectors';
import reducer from './reducer';
import saga from './saga';

const userSettings = {
  fontSize: 20,
};

export const MainContainer = styled.div``;

/* eslint-disable react/prefer-stateless-function */
export class SongPage extends React.Component {
  componentDidMount() {
    const { bookId } = this.props.match.params;
    this.props.fetchBook(bookId);
  }

  render() {
    return (
      <MainContainer>
        {this.props.songbook && (
          <SongBook
            {...this.props.songbook}
            currentSong={1}
            userSettings={userSettings}
          />
        )}
      </MainContainer>
    );
  }
}

SongPage.propTypes = {
  book: PropTypes.object,
  fetchBook: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  songbook: makeSelectBook(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchBook: id => dispatch(fetchBook(id)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'songPage', reducer });
const withSaga = injectSaga({ key: 'songPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SongPage);
