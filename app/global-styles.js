import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  html {
    top: 0;
    bottom: 0;
    position: fixed;
    left: 0px;
    right: 0px;
    overflow-y: hidden;
  }

  body {
    top: 0;
    bottom: 0;
    position: fixed;
    left: 0px;
    right: 0px;
    overflow-y: hidden;
    background-color: #000000;
    overscroll-behavior: none;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
