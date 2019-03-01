/**
 *
 * SharePage
 *
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BottomBar from 'components/BottomBar';
import ShareBook from 'components/ShareBook';
import { Link } from 'react-router-dom';
import { getLibrary } from '../../service/songService';
import { MainContainer, ContentContainer, BookContainer } from '../LibraryPage';

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

function ShareBooksPage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      const library = await getLibrary();
      setBooks(library);
    })();
  }, []);

  return (
    <MainContainer>
      <TitleContainer>
        <TitleText>Share Books</TitleText>
        <BackLinkContainer>
          <Link to="/library">
            <BackLink>Ready</BackLink>
          </Link>
        </BackLinkContainer>
      </TitleContainer>
      <ContentContainer>
        {books &&
          books.map((book, index) => (
            <BookContainer key={`${book.title}`}>
              <ShareBook {...book} />
            </BookContainer>
          ))}
      </ContentContainer>
      <BottomBar currentPage="library" showBars />
    </MainContainer>
  );
}

export default ShareBooksPage;
