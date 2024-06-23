import React from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import {
  theme,
  GlobalStyle,
  AppProvider,
  ErrorBoundary,
} from '@dailies-tracker/ui';
import * as services from './services';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

const ErrorPage = () => <h1>An error occured</h1>;

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
          <ErrorBoundary fallback={<ErrorPage />}>
            <AppProvider
              commissionService={commissionService}
              rewardService={rewardService}
              claimsService={claimsService}
            >
              <App />
            </AppProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </StyleSheetManager>
    </React.StrictMode>
  );
})();
