/**
 *
 * SongPage
 *
 */

import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import queryString from 'query-string';
import { fetchBooksFromUrl } from 'containers/App/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SongBook from 'components/SongBook';
import { SongContext } from 'components/SongContext';
import { getLibrary } from 'service/songService';
import { fetchBook, cleanStore } from './actions';
import { makeSelectBook } from './selectors';
import reducer from './reducer';
import saga from './saga';

export const MainContainer = styled.div`
  background-color: black;
  height: 100vh;
  widht: 100vw;
`;

const SongPage = function SongPage(props) {
  const songContext = useContext(SongContext);

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const dataUrl = params.url;
    if (dataUrl) {
      props.fetchBooks(dataUrl);
    } else {
      const { bookId } = props.match.params;
      if (bookId) {
        songContext.setCurrentSongBook(bookId);
        props.fetchBook(bookId);
      } else if (songContext.currentSongBook) {
        props.fetchBook(songContext.currentSongBook);
      } else {
        // If nothing works, fetch the first book
        props.fetchBook(0);
      }
    }
    return () => props.cleanStore();
  }, []);

  // This will update current song to songIndex when we directly arrive to a song
  // The most common use case is when user clicks search result
  useEffect(() => {
    const { songIndex } = props.match.params;
    if (songIndex) {
      songContext.setCurrentSong(parseInt(songIndex, 0));
    }
  }, []);

  return (
    <MainContainer>
      {props.songbook && (
        <SongBook {...props.songbook} currentSong={songContext.currentSong} />
      )}
    </MainContainer>
  );
};

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
    fetchBooks: url => dispatch(fetchBooksFromUrl(url)),
    cleanStore: () => dispatch(cleanStore()),
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
