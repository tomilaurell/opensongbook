/**
 *
 * LibraryPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import BottomBar from 'components/BottomBar';
import LibraryBook from 'components/LibraryBook';
import LoaderBook from 'components/LoaderBook';
import { makeSelectBooks, makeSelectFetchingBooksStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { fetchBooks, loadBooks } from './actions';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  position: fixed;
  background-color: black;
  color: white;
  font-size: 22px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  text-align: center;
  height: 60px;
  border-bottom: solid 2px #2b2b2b;
`;

export const ContentContainer = styled.div`
  margin-top: 60px;
  height: 100vh;
  padding-bottom: 140px;
  background-color: black;
  color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

export const BookContainer = styled.div`
  float: left;
  margin-left: 10vw;
  margin-top: 5vh;
`;

/* eslint-disable react/prefer-stateless-function */
export class LibraryPage extends React.Component {
  // Test with https://s3.eu-central-1.amazonaws.com/opensongbooks/Virsikirja_1992.song

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const dataUrl = params.url;
    if (dataUrl) {
      this.props.fetchBooks(dataUrl);
    }
    this.props.loadBooks();
  }

  render() {
    const { books, fetchStatus, location } = this.props;
    const params = queryString.parse(location.search);
    const dataUrl = params.url;
    return (
      <MainContainer>
        <TitleContainer>Open Songbook</TitleContainer>
        <ContentContainer>
          {books &&
            books.map((book, index) => (
              <BookContainer key={`${book.id}_${index}`}>
                <LibraryBook {...book} />
              </BookContainer>
            ))}
          {dataUrl &&
            fetchStatus !== 'FINISHED' && (
            <BookContainer>
              <LoaderBook dataUrl={dataUrl} />
            </BookContainer>
          )}
        </ContentContainer>
        <BottomBar currentPage="library" showBars />
      </MainContainer>
    );
  }
}

LibraryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadBooks: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  books: makeSelectBooks(),
  fetchStatus: makeSelectFetchingBooksStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchBooks: url => dispatch(fetchBooks(url)),
    loadBooks: () => dispatch(loadBooks()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'libraryPage', reducer });
const withSaga = injectSaga({ key: 'libraryPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LibraryPage);
