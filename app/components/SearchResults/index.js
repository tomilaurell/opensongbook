/**
 *
 * SearchResults
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchResult from 'components/SearchResult';
import styled from 'styled-components';
import { searchSongs } from 'service/searchService';

const MainContainer = styled.div``;

function SearchResults({ id, term, books }) {
  const [hits, setHits] = useState([]);

  useEffect(
    () => {
      setHits([]);
      if (term && term.trim().length > 2) {
        const subscription = searchSongs(books, term).subscribe(hit =>
          setHits(currentHits => [...currentHits, hit]),
        );
        return () => subscription.unsubscribe();
      }
      return null;
    },
    [term],
  );

  return (
    <MainContainer>
      {hits.map(hit => (
        <SearchResult
          key={`${hit.bookIndex} ${hit.index}`}
          term={term}
          song={hit}
        />
      ))}
    </MainContainer>
  );
}

SearchResults.propTypes = {
  id: PropTypes.number,
  term: PropTypes.string,
  books: PropTypes.array,
};

export default SearchResults;
