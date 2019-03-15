/**
 *
 * ShareBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QRCode } from 'react-qr-svg';
import { Link } from 'react-router-dom';
import { generateShareUrl } from '../../service/songService';

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
  const shareUrl = getShareUrl(url);
  const linkToBook = `/share/book/${id}`;
  return (
    <MainContainer>
      <Link to={linkToBook}>
        <BookContainer>
          <img src={`${coverImage}`} alt={title} style={coverStyles} />
          <QrContainer>
            <QRCode
              value={shareUrl}
              style={{ width: 64 }}
              fgColor="#ffffff"
              bgColor="#000000"
              level="L"
            />
          </QrContainer>
        </BookContainer>
      </Link>
    </MainContainer>
  );
}

export function getShareUrl(url) {
  const href = window.location.href;
  const baseUrl = href.substring(0, href.indexOf('/share'));
  const shareUrl = generateShareUrl(baseUrl, url);
  return shareUrl;
}

ShareBook.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ShareBook;
