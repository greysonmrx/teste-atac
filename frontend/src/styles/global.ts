import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #FAFAFA;
    color: #170C3A;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
  }

  button {
    font-size: 1.3rem !important;
  }

  html {
    font-size: 14px;
  }

  h1 {
    font-size: 3.42rem;
  }

  h2 {
    font-size: 2.6rem;
  }

  h3 {
    font-size: 2.15rem;
  }

  h4 {
    font-size: 1.86rem;
  }

  h5 {
    font-size: 1.7rem;
  }

  p {
    font-size: 1.4rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`;
