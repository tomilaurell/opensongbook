/**
 *
 * SharePage
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import BottomBar from 'components/BottomBar';
import Button from 'components/Button';
import { QRCode } from 'react-qr-svg';
import { Link } from 'react-router-dom';
import { getShareUrl } from 'components/ShareBook';
import TrashIcon from 'components/icons/TrashIcon';
import JwModal from 'jw-react-modal';
import { getBook, deletePersistedBook } from '../../service/songService';
import reducer from './reducer';
import saga from './saga';
import { deleteBook } from './actions';

import { MainContainer } from '../LibraryPage';

const TitleContainer = styled.div`
  position: fixed;
  top: 0px;
  background-color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  text-align: center;
  height: 40px;
  border-bottom: solid 2px #2b2b2b;
  display: flex;
  justify-content: space-between;
`;

const BackLinkContainer = styled.div`
  width: 25%;
`;

const BackLink = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  width: 50%;
`;

const TitleText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-weight: bold;
`;

const TrashIconContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
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

const ModalContent = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;

const ConfirmationText = styled.div`
  color: white;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
`;

const ConfirmationButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
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
  /*
  const deleteBookHandler = async event => {
    await deletePersistedBook(bookId);
    JwModal.close('jw-modal-1')(event);
    const href = window.location.href;
    window.location.href = `${href.substring(0, href.indexOf('/share'))}/share`;
  };
  */

  return (
    <MainContainer>
      <TitleContainer>
        <BackLinkContainer>
          <Link to="/share">
            <BackLink>Ready</BackLink>
          </Link>
        </BackLinkContainer>
        <TitleText>Share Book</TitleText>
        <TrashIconContainer>
          <TrashIcon onClick={JwModal.open('jw-modal-1')} />
        </TrashIconContainer>
      </TitleContainer>
      <JwModal id="jw-modal-1">
        <ModalContent>
          <ConfirmationText>
            Are you sure you want to remove this book?
          </ConfirmationText>
          <ConfirmationButtonRow>
            <Button
              value="No, keep it!"
              onClick={JwModal.close('jw-modal-1')}
            />
            <Button
              value="Yes, delete."
              onClick={() => props.deleteBook(bookId)}
            />
          </ConfirmationButtonRow>
        </ModalContent>
      </JwModal>
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

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    deleteBook: id => dispatch(deleteBook(id)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'shareBookPage', reducer });
const withSaga = injectSaga({ key: 'shareBookPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShareBookPage);
