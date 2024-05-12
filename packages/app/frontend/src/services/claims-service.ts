import { ClaimsService } from '@dailies-tracker/ui';
import * as claimsServiceImpl from '@/internal/main/ClaimsService';

export async function claimsService(): Promise<ClaimsService> {
  return {
    setupClaimsForToday() {
      return claimsServiceImpl.SetupClaimsForToday();
    },
    claimCommissionForToday(commissionId: number) {
      return claimsServiceImpl.ClaimCommissionForToday(commissionId);
    },
    claimDailyBonusForToday() {
      return claimsServiceImpl.ClaimDailyBonusForToday();
    },
    isTodaysBonusClaimed() {
      return claimsServiceImpl.IsTodaysBonusClaimed();
    },
  };
}
