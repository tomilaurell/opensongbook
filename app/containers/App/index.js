/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SongPage from 'containers/SongPage/Loadable';
import LibraryPage from 'containers/LibraryPage/Loadable';
import InfoPage from 'containers/InfoPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={SongPage} />
        <Route exact path="/book" component={SongPage} />
        <Route exact path="/book/:bookId" component={SongPage} />
        <Route exact path="/library" component={LibraryPage} />
        <Route exact path="/info" component={InfoPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
