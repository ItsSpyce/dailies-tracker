import { ClaimsService } from '@dailies-tracker/ui';

export async function claimsService(): Promise<ClaimsService> {
  return {
    setupClaimsForToday() {
      return window.claimsService.setupClaimsForToday();
    },
    claimCommissionForToday(commissionId: number) {
      return window.claimsService.claimCommissionForToday(commissionId);
    },
    claimDailyBonusForToday() {
      return window.claimsService.claimDailyBonusForToday();
    },
    isTodaysBonusClaimed() {
      return window.claimsService.isTodaysBonusClaimed();
    },
    clearTodaysClaims() {
      return window.claimsService.clearTodaysClaims();
    },
  };
}
