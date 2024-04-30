import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import * as locales from '@dailies-tracker/i18n';
import { I18nContext, theme, GlobalStyle } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';
import { match } from 'ts-pattern';

deskify({
  allowContextMenu: false,
  allowFullscreenWithKeys: true,
  allowReloadKey: true,
});

const localeSwitch = (lang: string) =>
  match(lang)
    .with('en_US.UTF-8', () => locales.enUS)
    .with('de_DE.UTF-8', () => locales.deDE)
    .with('vi_VN.UTF-8', () => locales.viVN)
    .with('pt_BR.UTF-8', () => locales.ptBR)
    .with('ru_RU.UTF-8', () => locales.ruRU)
    .with('fr_FR.UTF-8', () => locales.frFR)
    .with('es_ES.UTF-8', () => locales.esES)
    .with('id_ID.UTF-8', () => locales.idID)
    .with('nl_NL.UTF-8', () => locales.nlNL)
    // insert more locales here
    .otherwise(() => locales.enUS);

(async () => {
  const lang = await app.GetLocale();
  const selectedLocale = localeSwitch(lang);
  const container = document.getElementById('root');

  const root = createRoot(container!);

  Modal.setAppElement(container!);

  root.render(
    <React.StrictMode>
      <StyleSheetManager>
        <I18nContext.Provider value={selectedLocale}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </I18nContext.Provider>
      </StyleSheetManager>
    </React.StrictMode>
  );
})();
