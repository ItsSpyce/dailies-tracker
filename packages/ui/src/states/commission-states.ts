import { atom, selector, useRecoilState } from 'recoil';
import { I18nAtom } from './i18n-states';

export const AvailableRealmsSelector = selector<string[]>({
  key: 'AvailableRealms',
  get: ({ get }) => {
    const i18n = get(I18nAtom);
    const realms = JSON.parse(
      localStorage.getItem('realms') ?? '[]'
    ) as string[] satisfies string[];
    if (i18n != null) {
      realms.push(...(i18n.realms ?? []));
    }
    return realms.filter((r, i) => realms.indexOf(r) === i);
  },
  set: (_, newRealms) => {
    localStorage.setItem('realms', JSON.stringify(newRealms));
  },
});

export function useAvailableRealms() {
  return useRecoilState(AvailableRealmsSelector);
}
