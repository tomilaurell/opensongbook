/* eslint-disable react/no-array-index-key */
/**
 *
 * SearchResult
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { removeSpecials } from 'service/searchService';

const MainContainer = styled.div`
  background-color: #1a1a1a;
  border-bottom: solid 2px #2b2b2b;
  padding: 10px;
  width: 100vw;
`;

const FirstLine = styled.div`
  font-size: 20px;
`;

const TitleContainer = styled.div`
  font-size: 13px;
  float: right;
`;

const SecondLine = styled.div`
  margin-top: 3px;
  font-size: 18px;
`;

const SeconsLinePart = styled.span``;

const SeconsLinePartBold = styled.span`
  color: yellow;
`;

const ThirdLine = styled.div`
  margin-top: 3px;
  font-size: 18px;
`;

function stripTrailingSpecialCharacters(text) {
  return text.replace(/[\\.,\\:]+$/, '');
}

function getIndicesOf(origSearchStr, origStr) {
  const searchStrLen = origSearchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  let startIndex = 0;
  let index;
  const indices = [];

  const str = removeSpecials(origStr.toLowerCase());
  const searchStr = removeSpecials(origSearchStr.toLowerCase());

  // eslint-disable-next-line no-cond-assign
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }

  return indices;
}

function getLineObject(term, sentence) {
  const hits = getIndicesOf(term, sentence);
  const line = [];
  let startIndex = 0;
  let i;
  for (i = 0; i < hits.length; i++) {
    if (hits[i] !== startIndex) {
      line.push({
        text: sentence.substring(startIndex, hits[i]),
        bold: false,
      });
    }

    let endIndex = hits[i] + term.length;
    let text = sentence.substring(hits[i], endIndex);
    const removedCharacterCount = text.length - removeSpecials(text).length;
    // Highlight also characters that are removed in actual search
    if (removedCharacterCount > 0) {
      endIndex += removedCharacterCount;
      text = sentence.substring(hits[i], endIndex);
    }

    line.push({
      text,
      bold: true,
    });
    startIndex = endIndex;
  }
  line.push({
    text: sentence.substring(startIndex),
    bold: false,
  });
  return line;
}

function getThirdLine(term, song) {
  const lowCaseTerm = term.toLowerCase();
  const matchedVerse = song.verses.find(verse =>
    verse.sentences.find(
      sentence => sentence.toLowerCase().search(lowCaseTerm) >= 0,
    ),
  );
  if (matchedVerse) {
    const matchedSentence = matchedVerse.sentences.find(
      sentence => sentence.toLowerCase().search(lowCaseTerm) >= 0,
    );
    return getLineObject(term, stripTrailingSpecialCharacters(matchedSentence));
  }
  return null;
}

function SearchResult({ term, song }) {
  const firstSentence = stripTrailingSpecialCharacters(
    song.verses[0].sentences[0],
  );
  const secondLine = getLineObject(term, firstSentence);
  const secondLineMatch = secondLine.find(line => line.bold);
  let thirdLine;
  if (!secondLineMatch) {
    thirdLine = getThirdLine(term, song);
  }
  return (
    <MainContainer>
      <Link
        to={`/book/${song.bookIndex}/${song.index}`}
        style={{ color: 'white' }}
      >
        <TitleContainer>{song.bookTitle}</TitleContainer>
        <FirstLine>{song.index}</FirstLine>
        <SecondLine>
          {secondLine.map((part, index) => {
            if (part.bold) {
              return (
                <SeconsLinePartBold key={index}>{part.text}</SeconsLinePartBold>
              );
            }
            return <SeconsLinePart key={index}>{part.text}</SeconsLinePart>;
          })}
        </SecondLine>
        {thirdLine && (
          <ThirdLine>
            <span>... </span>
            {thirdLine.map((part, index) => {
              if (part.bold) {
                return (
                  <SeconsLinePartBold key={index}>
                    {part.text}
                  </SeconsLinePartBold>
                );
              }
              return <SeconsLinePart key={index}>{part.text}</SeconsLinePart>;
            })}
          </ThirdLine>
        )}
      </Link>
    </MainContainer>
  );
}

SearchResult.propTypes = {
  term: PropTypes.string.isRequired,
  song: PropTypes.object.isRequired,
};

export default SearchResult;
