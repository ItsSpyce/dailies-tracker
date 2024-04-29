import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles';
import { theme } from './theme';
import { I18nContext } from './contexts';
import { enUs } from './i18n';

deskify({
  allowContextMenu: false,
  allowFullscreenWithKeys: true,
  allowReloadKey: true,
});

const container = document.getElementById('root');

const root = createRoot(container!);

Modal.setAppElement(container!);

root.render(
  <React.StrictMode>
    <StyleSheetManager>
      <I18nContext.Provider value={enUs}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </I18nContext.Provider>
    </StyleSheetManager>
  </React.StrictMode>
);
