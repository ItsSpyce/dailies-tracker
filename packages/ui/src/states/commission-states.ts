import { atom, selector, useRecoilState } from 'recoil';
import { ShouldNotifySelector } from './settings-states';

export function useShouldNotify() {
  return useRecoilState(ShouldNotifySelector);
}

export const DayComingToEndAtom = atom<number>({
  key: 'DayComingToEndAtom',
  default: 1000 * 60 * 15,
});

export function useDayComingToEnd() {
  return useRecoilState(DayComingToEndAtom);
}
