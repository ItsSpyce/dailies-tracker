import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, AppProvider } from '@dailies-tracker/ui';
import { commissionService } from './services/commission-service';
import { rewardService } from './services/reward-service';
import { langService } from './services/lang-service';

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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppProvider
          commissionService={commissionService}
          rewardService={rewardService}
          langService={langService}
        >
          <App />
        </AppProvider>
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>
);
