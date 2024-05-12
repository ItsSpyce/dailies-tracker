import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, AppProvider } from '@dailies-tracker/ui';
import * as services from './services';

deskify({
  allowContextMenu: false,
  allowFullscreenWithKeys: true,
  allowReloadKey: true,
});
const container = document.getElementById('root');
const root = createRoot(container!);

(async () => {
  const [commissionService, rewardService, claimsService] = await Promise.all([
    services.commissionService(),
    services.rewardService(),
    services.claimsService(),
  ]);

  root.render(
    <React.StrictMode>
      <StyleSheetManager>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppProvider
            commissionService={commissionService}
            rewardService={rewardService}
            claimsService={claimsService}
          >
            <App />
          </AppProvider>
        </ThemeProvider>
      </StyleSheetManager>
    </React.StrictMode>
  );
})();
