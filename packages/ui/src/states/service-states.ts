import { atom, useRecoilState } from 'recoil';
import { CommissionService, RewardService } from '../services';
import { createContext, useContext } from 'react';

export const CommissionServiceContext = createContext<CommissionService>(null!);
export const RewardServiceContext = createContext<RewardService>(null!);
export const DailyCheckAtom = atom<NodeJS.Timeout | null>({
  key: 'DailyCheckAtom',
  default: null,
});

export function useCommissionService() {
  return useContext(CommissionServiceContext);
}

export function useRewardService() {
  return useContext(RewardServiceContext);
}

export function useDailyCheckTimer() {
  return useRecoilState(DailyCheckAtom);
}
