/**
 *
 * SongBook
 *
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swipeable from 'react-swipeable';
import Song from 'components/Song';
import Slider from 'react-slick';
import TopBar from 'components/TopBar';
import BottomBar from 'components/BottomBar';
import ChevronIcon from 'components/icons/ChevronIcon';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

export const MainContainer = styled.div``;

export const BookContainer = styled.div``;

const ArrowContainerLeft = styled.div`
  position: fixed;
  bottom: 50px;
  color: #ffffff;
  border-radius: 30px;
  background-color: #353535;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  left: 15px;
`;

const ArrowContainerRight = styled.div`
  position: fixed;
  bottom: 50px;
  color: #ffffff;
  border-radius: 30px;
  background-color: #353535;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  right: 15px;
  padding-left: 8px;
`;

export default class SongBook extends Component {
  state = {
    currentSlideIndex: 1,
    showBars: true,
    swiping: false,
    swipingHorizontally: false,
    swipingVertically: false,
  };

  constructor(props) {
    super(props);
    this.handleShowBars = this.handleShowBars.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  handleShowBars = value => {
    this.setState({
      showBars: value,
    });
  };

  changeSong = songIndex => {
    const firstSong = this.props.songs[0];
    const lastSong = this.props.songs[this.props.songs.length - 1];
    let navigateToSong = Number(songIndex);
    if (!navigateToSong || navigateToSong < firstSong.index) {
      navigateToSong = firstSong.index;
    } else if (navigateToSong > lastSong.index) {
      navigateToSong = lastSong.index;
    }
    const newPages = this.getNewPages(
      navigateToSong,
      this.state.currentSlideIndex,
    );
    this.setState({
      selectedSongIndexes: newPages,
    });
  };

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  getNewPages = (index, slideIndex) => {
    const len = this.props.songs.length;
    const newPages = [];
    if (index === this.props.songs[len - 1].index) {
      let i = 0;
      newPages[i++] = this.props.songs[len - 2].index;
      newPages[i++] = this.props.songs[len - 1].index;
      newPages[i++] = this.props.songs[0].index;
    } else if (index === this.props.songs[0].index) {
      let i = 0;
      newPages[i++] = this.props.songs[len - 1].index;
      newPages[i++] = this.props.songs[0].index;
      newPages[i++] = this.props.songs[1].index;
    } else {
      let i = 0;
      newPages[i++] = index - 1;
      newPages[i++] = index;
      newPages[i++] = index + 1;
    }
    return this.getShiftedPages(newPages, slideIndex);
  };

  getShiftedPages = (pages, index) => {
    if (index === 1) {
      return pages;
    }
    if (index === 2) {
      const shiftedPages = [];
      shiftedPages[0] = pages[2];
      shiftedPages[1] = pages[0];
      shiftedPages[2] = pages[1];
      return shiftedPages;
    }
    const shiftedPages = [];
    shiftedPages[0] = pages[1];
    shiftedPages[1] = pages[2];
    shiftedPages[2] = pages[0];
    return shiftedPages;
  };

  getSelectedSongs() {
    let selectedSongIndexes = this.state.selectedSongIndexes;
    if (!selectedSongIndexes) {
      selectedSongIndexes = this.getNewPages(this.props.currentSong, 1);
    }
    return selectedSongIndexes;
  }

  swipingHorizontally(e, absX) {
    const { swiping, swipingHorizontally } = this.state;
    if (!swiping && !swipingHorizontally) {
      this.setState({
        swipingHorizontally: true,
        swiping: true,
      });
    }
  }

  swipingVertically(e, absX) {
    const { swiping, swipingVertically } = this.state;
    if (!swiping && !swipingVertically) {
      this.setState({
        swipingVertically: true,
        swiping: true,
      });
    }
  }

  swiped(e, absX) {
    this.setState({
      swipingHorizontally: false,
      swipingVertically: false,
      swiping: false,
    });
  }

  render() {
    const settings = {
      dots: false,
      lazyLoad: false,
      infinite: true,
      speed: 250,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      touchThreshold: 5,
      adaptiveHeight: true,
      afterChange: index => {
        const songIndex = this.getSelectedSongs()[index];
        const newPages = this.getNewPages(songIndex, index);
        this.setState({
          selectedSongIndexes: newPages,
          currentSlideIndex: index,
          showBars: true,
        });
      },
    };

    const selectedSongIndexes = this.getSelectedSongs();
    const renderedSongs = [];

    this.props.songs.forEach(song => {
      if (selectedSongIndexes.includes(song.index)) {
        const index = selectedSongIndexes.indexOf(song.index);
        renderedSongs[index] = (
          <Song
            handleShowBars={this.handleShowBars}
            swipingHorizontally={this.state.swipingHorizontally}
            key={song.index}
            changeSong={this.changeSong}
            userSettings={this.props.userSettings}
            {...song}
          />
        );
      }
    });

    const { showBars } = this.state;

    return (
      <MainContainer>
        <TopBar showBars={this.state.showBars} title={this.props.title} />
        <BookContainer>
          <Swipeable
            onSwipingLeft={this.swipingHorizontally.bind(this)}
            onSwipingRight={this.swipingHorizontally.bind(this)}
            onSwipingDown={this.swipingVertically.bind(this)}
            onSwipingUp={this.swipingVertically.bind(this)}
            onSwiped={this.swiped.bind(this)}
          >
            <Slider
              initialSlide={1}
              ref={slider => (this.slider = slider)}
              {...settings}
            >
              {renderedSongs}
            </Slider>
          </Swipeable>
          {showBars && (
            <ArrowContainerLeft onClick={this.previous}>
              <ChevronIcon direction="left" />
            </ArrowContainerLeft>
          )}
          {showBars && (
            <ArrowContainerRight onClick={this.next}>
              <ChevronIcon direction="right" />
            </ArrowContainerRight>
          )}
        </BookContainer>
        <BottomBar currentPage="book" showBars={this.state.showBars} />
      </MainContainer>
    );
  }
}
