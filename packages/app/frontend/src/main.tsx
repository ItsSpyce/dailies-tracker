import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import App from './App';
import { deskify } from './deskify';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, AppProvider, images } from '@dailies-tracker/ui';
import { commissionService } from './services/commission-service';
import { rewardService } from './services/reward-service';
import { langService } from './services/lang-service';

deskify({
  allowContextMenu: false,
  allowFullscreenWithKeys: true,
  allowReloadKey: true,
});

(async () => {
  const container = document.getElementById('root');

  const appCommissionService = commissionService();
  const appRewardService = rewardService();
  const appLangService = langService();

  const rewards = await appRewardService.getAvailableRewards();
  if (rewards.length === 0) {
    await appRewardService.addReward(
      'Primos',
      400,
      await convertImageUrlToBase64(images.Primos)
    );
    await appRewardService.addReward(
      'ARExp',
      200,
      await convertImageUrlToBase64(images.ARExp)
    );
    await appRewardService.addReward(
      'Cleaning Points',
      150,
      await convertImageUrlToBase64(images.CleanPoints)
    );
    await appRewardService.addReward(
      'Creative Points',
      150,
      await convertImageUrlToBase64(images.CreativePoints)
    );
    await appRewardService.addReward(
      'Health',
      100,
      await convertImageUrlToBase64(images.HealthPoints)
    );
  }

  const root = createRoot(container!);

  Modal.setAppElement(container!);

  root.render(
    <React.StrictMode>
      <StyleSheetManager>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppProvider
            commissionService={appCommissionService}
            rewardService={appRewardService}
            langService={appLangService}
          >
            <App />
          </AppProvider>
        </ThemeProvider>
      </StyleSheetManager>
    </React.StrictMode>
  );
})();

function convertImageUrlToBase64(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
  });
}
