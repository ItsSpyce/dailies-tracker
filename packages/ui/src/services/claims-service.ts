import { TaskReward } from '../types';

export interface ClaimsService {
  setupClaimsForToday(): Promise<TaskReward[]>;
  claimCommissionForToday(commissionId: number): Promise<void>;
  claimDailyBonusForToday(): Promise<void>;
  isTodaysBonusClaimed(): Promise<boolean>;
  clearTodaysClaims(): Promise<void>;
}
