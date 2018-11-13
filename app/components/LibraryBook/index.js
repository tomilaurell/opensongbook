/**
 *
 * LibraryBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContainer = styled.div`
`;

export const BookContainer = styled.div`
  background-color: #353535;
  color: white;
  width: 35vw;
  text-align: center;
  height: 180px;
  padding-top: 30px;
  border-radius: 8px;
  border-right: 1px solid #ababab;
  border-bottom: 1px solid #ababab;
  max-width: 140px;
  font-size: 20px;
  padding-left: 5px;
  padding-right: 5px;
`;

function LibraryBook({ title, id }) {
  const linkToBook = `/book/${id}`;
  return (
    <MainContainer>
      <Link to={linkToBook}>
        <BookContainer>{title}</BookContainer>
      </Link>
    </MainContainer>
  );
}

LibraryBook.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LibraryBook;
