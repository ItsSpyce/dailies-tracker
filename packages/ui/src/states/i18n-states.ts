import * as i18n from '@dailies-tracker/i18n';
import { selector, useRecoilValue } from 'recoil';
import { LanguageSelector } from './settings-states';

export const I18nSelector = selector<i18n.I18nProvider>({
  key: 'I18n',
  get({ get }) {
    const lang = get(LanguageSelector) as keyof typeof i18n;
    return i18n[lang];
  },
});

export function useI18n() {
  return useRecoilValue(I18nSelector);
}
