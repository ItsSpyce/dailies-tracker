import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import * as locales from '@dailies-tracker/i18n';
import {
  I18nContext,
  theme,
  GlobalStyle,
  AppProvider,
} from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';
import { match } from 'ts-pattern';
import { commissionService } from './services/commission-service';

deskify({
  allowContextMenu: false,
  allowFullscreenWithKeys: true,
  allowReloadKey: true,
});

const localeSwitch = (lang: string) =>
  match(lang)
    .with('en_US', () => locales.enUS)
    .with('de_DE', () => locales.deDE)
    .with('vi_VN', () => locales.viVN)
    .with('pt_BR', () => locales.ptBR)
    .with('ru_RU', () => locales.ruRU)
    .with('fr_FR', () => locales.frFR)
    .with('es_ES', () => locales.esES)
    .with('id_ID', () => locales.idID)
    .with('nl_NL', () => locales.nlNL)
    .with('tg_PH', () => locales.tgPH)
    // insert more locales here
    .otherwise(() => locales.enUS);

(async () => {
  const lang = await app.GetLocale();
  const selectedLocale = localeSwitch(lang);
  const container = document.getElementById('root');
  const appCommissionService = commissionService();

  const root = createRoot(container!);

  Modal.setAppElement(container!);

  root.render(
    <React.StrictMode>
      <StyleSheetManager>
        <I18nContext.Provider value={selectedLocale}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppProvider commissionService={appCommissionService}>
              <App />
            </AppProvider>
          </ThemeProvider>
        </I18nContext.Provider>
      </StyleSheetManager>
    </React.StrictMode>
  );
})();
