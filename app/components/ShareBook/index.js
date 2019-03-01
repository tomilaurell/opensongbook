/**
 *
 * ShareBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';

export const MainContainer = styled.div``;

export const QrContainer = styled.div`
  position: relative;
  left: 25%;
  width: 0px;
  float: left;
  top: 25px;
`;

export const BookContainer = styled.div`
  float: left;
`;

const coverStyles = {
  maxWidth: '35vw',
};

function ShareBook({ title, id, coverImage, url }) {
  const linkToBook = `/share/book/${id}`;
  return (
    <MainContainer>
      <Link to={linkToBook}>
        <BookContainer>
          <img src={`${coverImage}`} alt={title} style={coverStyles} />
          <QrContainer>
            <QRCode value={url} size={64} />
          </QrContainer>
        </BookContainer>
      </Link>
    </MainContainer>
  );
}

ShareBook.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ShareBook;
