/**
 *
 * LoaderBook
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

export const MainContainer = styled.div``;

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
`;
function LoaderBook({ dataUrl }) {
  return (
    <MainContainer>
      <BookContainer>
        <Loader active inline="centered">
          {dataUrl}
        </Loader>
      </BookContainer>
    </MainContainer>
  );
}

LoaderBook.propTypes = {};

export default LoaderBook;
