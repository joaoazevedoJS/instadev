import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, button, textarea, input {
    font-family: 'Lato', sans-serif;
  }

  body {
    font-size: 14px;
    line-height: 24px;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 600px) {
    body {
      font-size: 16px;
      line-height: 26px;
    }
  }
`;
