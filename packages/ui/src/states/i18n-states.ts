import * as i18n from '@dailies-tracker/i18n';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const I18nAtom = selector<i18n.I18nProvider>({
  key: 'I18n',
  get({ get }) {
    const lang = get(LangAtom) as keyof typeof i18n;
    return i18n[lang];
  },
});

export const LangAtom = atom<string>({
  key: 'Lang',
  default: 'en_US',
});

export function useLang() {
  return useRecoilState(LangAtom);
}

export function useI18n() {
  return useRecoilValue(I18nAtom);
}
