import { selector, atom } from 'recoil';

export type AppSettings = {
  shouldNotify: boolean;
  showReleasePopup: boolean;
  language: string;
  timeBeforeAlerting: number;
};

export const AppSettingsAtom = atom<AppSettings>({
  key: 'AppSettingsAtom',
  default: JSON.parse(
    localStorage.getItem('app-settings') ??
      JSON.stringify({
        shouldNotify: false,
        showReleasePopup: true,
        language: 'en_US',
        timeBeforeAlerting: 1000 * 60 * 15,
      })
  ) as AppSettings,
  effects: [
    ({ onSet }) => {
      onSet((newSettings) => {
        localStorage.setItem('app-settings', JSON.stringify(newSettings));
      });
    },
  ],
});

export const ShouldNotifySelector = selector<boolean>({
  key: 'ShouldNotifySelector',
  get: ({ get }) => {
    return get(AppSettingsAtom).shouldNotify;
  },
  set: ({ set }, shouldNotify) => {
    if (typeof shouldNotify !== 'boolean') {
      shouldNotify = false;
    }
    set(AppSettingsAtom, (prev) => ({ ...prev, shouldNotify }));
  },
});

export const ShowReleasePopupSelector = selector<boolean>({
  key: 'ShowReleasePopupSelector',
  get: ({ get }) => {
    return get(AppSettingsAtom).showReleasePopup;
  },
  set: ({ set }, showReleasePopup) => {
    if (typeof showReleasePopup !== 'boolean') {
      showReleasePopup = false;
    }
    set(AppSettingsAtom, (prev) => ({ ...prev, showReleasePopup }));
  },
});

export const LanguageSelector = selector<string>({
  key: 'LanguageSelector',
  get: ({ get }) => {
    return get(AppSettingsAtom).language;
  },
  set: ({ set }, language) => {
    if (typeof language !== 'string') {
      language = 'en_US';
    }
    set(AppSettingsAtom, (prev) => ({ ...prev, language }));
  },
});

export const TimeBeforeAlertingSelector = selector<number>({
  key: 'TimeBeforeAlertingSelector',
  get: ({ get }) => {
    return get(AppSettingsAtom).timeBeforeAlerting;
  },
  set: ({ set }, timeBeforeAlerting) => {
    if (typeof timeBeforeAlerting !== 'number') {
      timeBeforeAlerting = 1000 * 60 * 15;
    }
    set(AppSettingsAtom, (prev) => ({ ...prev, timeBeforeAlerting }));
  },
});
