import { I18nProvider } from '@dailies-tracker/i18n';
import { atom, useRecoilState } from 'recoil';

export const I18nAtom = atom<I18nProvider>({
  key: 'I18n',
  default: null!,
});

export function useI18n() {
  return useRecoilState(I18nAtom);
}
