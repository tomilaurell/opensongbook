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
import PlusIcon from 'components/icons/PlusIcon';
import JwModal from 'jw-react-modal';
import { fetchBooksFromUrl } from 'containers/App/actions';
import { makeSelectBooks, makeSelectFetchingBooksStatus } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loadBooks } from './actions';
import './modal.css';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  widht: 100vw;
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

export const PlusIconContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  margin-top: 60px;
  height: 100vh;
  padding-bottom: 140px;
  background-color: black;
  color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-wrap: wrap;
`;

export const BookContainer = styled.div`
  margin-left: 10vw;
  margin-top: 5vh;
`;

export const ModalContent = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const UrlHelpText = styled.div`
  color: white;
  font-size: 20px;
  text-align: center;
`;

export const UrlInput = styled.input`
  margin-top: 40px;
  line-height: 30px;
  width: 100%;
  color: white;
  font-size: 20px;
  align-self: center;
`;

/* eslint-disable react/prefer-stateless-function */
export class LibraryPage extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.openAddBookModal = this.openAddBookModal.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const dataUrl = params.url;
    if (dataUrl) {
      this.props.fetchBooks(dataUrl);
    }
    this.props.loadBooks();
  }

  openAddBookModal = event => {
    console.log('openAddBookModal');
    JwModal.open('jw-modal-1');
  };

  handleAddBook = event => {
    if (event.target.value) {
      this.props.fetchBooks(event.target.value);
      this.setState({
        loadingBook: event.target.value,
      });
      JwModal.close('jw-modal-1')(event);
      event.target.value = '';
    }
  };

  render() {
    const { books, fetchStatus, location } = this.props;
    const { loadingBook } = this.state;
    const params = queryString.parse(location.search);
    const dataUrl = params.url;
    return (
      <MainContainer>
        <TitleContainer>Open Songbook</TitleContainer>
        <PlusIconContainer>
          <PlusIcon onClick={JwModal.open('jw-modal-1')} />
        </PlusIconContainer>
        <JwModal id="jw-modal-1">
          <ModalContent>
            <UrlHelpText>
              Type short link to the book and close modal.
            </UrlHelpText>
            <UrlInput
              type="url"
              onBlur={this.handleAddBook}
              placeholder="something"
            />
          </ModalContent>
        </JwModal>
        <ContentContainer>
          {books &&
            books.map((book, index) => (
              <BookContainer key={`${book.title}`}>
                <LibraryBook {...book} />
              </BookContainer>
            ))}
          {dataUrl &&
            fetchStatus !== 'FINISHED' && (
              <BookContainer>
                <LoaderBook dataUrl={dataUrl} />
              </BookContainer>
            )}
          {loadingBook && (
            <BookContainer>
              <LoaderBook dataUrl={loadingBook} />
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
    fetchBooks: url => dispatch(fetchBooksFromUrl(url)),
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
