import { atom, useRecoilState } from 'recoil';
import { CommissionService, LangService, RewardService } from '../services';

export const CommissionServiceAtom = atom<CommissionService>({
  key: 'CommissionService',
  default: null!,
});

export const RewardServiceAtom = atom<RewardService>({
  key: 'RewardService',
  default: null!,
});

export const LangServiceAtom = atom<LangService>({
  key: 'LangService',
  default: null!,
});

export function useCommissionService() {
  return useRecoilState(CommissionServiceAtom);
}

export function useRewardService() {
  return useRecoilState(RewardServiceAtom);
}

export function useLangService() {
  return useRecoilState(LangServiceAtom);
}
