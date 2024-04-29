import { createGlobalStyle } from 'styled-components';
import { sides } from './utils/scomp';

export const GlobalStyle = createGlobalStyle`
html, body {
  font-family: 'ZH', sans-serif;
  padding: 0;
  margin: 0;
}

body {
  background-color: ${(props) => props.theme.colors.background};
  color: #32322f;
  height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  .mdxeditor-popup-container {
    display: none;
  }
}

#root {
  position: absolute;
  ${sides(0)}
}

.Modal {
  background-color: ${(props) => props.theme.colors.backgroundColored};
}
`;
