/**
 *
 * SharePage
 *
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomBar from 'components/BottomBar';
import { QRCode } from 'react-qr-svg';
import { Link } from 'react-router-dom';
import { getShareUrl } from 'components/ShareBook';
import { getBook } from '../../service/songService';

import { MainContainer } from '../LibraryPage';

const TitleContainer = styled.div`
  position: fixed;
  top: 0px;
  background-color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  border-bottom: solid 2px #2b2b2b;
`;

const BackLinkContainer = styled.div`
  float: left;
  bottom: 20px;
  position: relative;
  left: 10px;
`;

const BackLink = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const TitleText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 60px;
  padding-bottom: 140px;
  background-color: black;
  color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShortLinkTitleContainer = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ShortLinkContainer = styled.div`
  padding-top: 20px;
  font-size: 50px;
  font-weight: 600;
`;

const QrCodeContainer = styled.div`
  padding-top: 80px;
  padding-bottom: 30px;
`;

function ShareBookPage(props) {
  const [book, setBook] = useState();
  const { bookId } = props.match.params;
  useEffect(() => {
    (async () => {
      const bookData = await getBook(bookId);
      setBook(bookData);
    })();
  }, []);

  return (
    <MainContainer>
      <TitleContainer>
        <TitleText>Share Book</TitleText>
        <BackLinkContainer>
          <Link to="/share">
            <BackLink>Ready</BackLink>
          </Link>
        </BackLinkContainer>
      </TitleContainer>
      {book && (
        <ContentContainer>
          <CenteredContainer>
            <ShortLinkTitleContainer>Short link:</ShortLinkTitleContainer>
            <ShortLinkContainer>{book.url}</ShortLinkContainer>
            <QrCodeContainer>
              <QRCode
                value={getShareUrl(book.url)}
                style={{ width: 256 }}
                fgColor="#ffffff"
                bgColor="#000000"
                level="H"
              />
            </QrCodeContainer>
          </CenteredContainer>
        </ContentContainer>
      )}
      <BottomBar currentPage="library" showBars />
    </MainContainer>
  );
}

export default ShareBookPage;
