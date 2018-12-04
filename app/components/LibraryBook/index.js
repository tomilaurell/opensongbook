/**
 *
 * LibraryBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContainer = styled.div``;

const coverStyles = {
  maxWidth: '35vw',
};

function LibraryBook({ title, id, coverImage }) {
  const linkToBook = `/book/${id}`;
  return (
    <MainContainer>
      <Link to={linkToBook}>
        <img src={`${coverImage}`} alt={title} style={coverStyles} />
      </Link>
    </MainContainer>
  );
}

LibraryBook.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LibraryBook;
