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
import SearchPage from 'containers/SearchPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ThemeProvider } from 'components/ThemeContext';

import GlobalStyle from '../../global-styles';

const App = function App() {
  return (
    <div>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={SongPage} />
          <Route exact path="/book" component={SongPage} />
          <Route exact path="/book/:bookId" component={SongPage} />
          <Route exact path="/book/:bookId/:songIndex" component={SongPage} />
          <Route exact path="/library" component={LibraryPage} />
          <Route exact path="/info" component={InfoPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
      <GlobalStyle />
    </div>
  );
};

export default App;
