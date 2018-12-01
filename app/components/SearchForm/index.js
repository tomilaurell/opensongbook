/**
 *
 * SearchForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import { useEventCallback } from 'rxjs-hooks';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';

const MainContainer = styled.div`
  margin-top: 5px;
  display: flex;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
`;

const BackContainer = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  padding-top: 8px;
  border-radius: 5px;
`;

const linkStyles = {
  width: '20%',
  display: 'flex',
  marginLeft: '5px',
};

export default function SearchForm({ initialTerm = '', handleSearch }) {
  const [term, setTerm] = useState(initialTerm);

  const [inputOnChange] = useEventCallback(
    event$ =>
      event$.pipe(
        map(event => event.target.value),
        tap(value => setTerm(value)),
        debounceTime(400),
        distinctUntilChanged(),
        tap(value => handleSearch({ term: value })),
      ),
    [],
  );

  return (
    <MainContainer>
      <Input
        value={term}
        onChange={inputOnChange}
        placeholder="Search with..."
        style={{ width: '80%' }}
      />
      <Link to="/book" style={linkStyles}>
        <BackContainer>Cancel</BackContainer>
      </Link>
    </MainContainer>
  );
}

SearchForm.propTypes = {
  initialTerm: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};
