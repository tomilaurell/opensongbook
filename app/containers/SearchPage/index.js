/**
 *
 * SearchPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SearchForm from 'components/SearchForm';
import SearchResults from 'components/SearchResults';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getLibrary } from 'service/songService';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchPage from './selectors';
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

const SearchFormContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 0px;
  right: 0px;
  background-color: black;
  border-bottom: solid 2px #2b2b2b;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0px;
  background-color: black;
  color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

/* eslint-disable react/prefer-stateless-function */
export class SearchPage extends React.Component {
  state = {
    id: 1,
    term: '',
  };

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch({ term }) {
    this.setState({
      term,
    });
  }

  async componentDidMount() {
    const books = await getLibrary();
    this.setState({
      books,
    });
    disableBodyScroll(document.querySelector('#targetElementId'));
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const { id, term, books } = this.state;
    return (
      <MainContainer>
        <TitleContainer>Search</TitleContainer>
        <SearchFormContainer>
          <SearchForm handleSearch={this.handleSearch} />
        </SearchFormContainer>
        <ContentContainer id="targetElementId">
          {term && books && <SearchResults id={id} term={term} books={books} />}
        </ContentContainer>
      </MainContainer>
    );
  }
}

SearchPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchPage: makeSelectSearchPage(),
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

const withReducer = injectReducer({ key: 'searchPage', reducer });
const withSaga = injectSaga({ key: 'searchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
