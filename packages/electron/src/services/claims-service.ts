import { Route, Controller } from '../router';

@Controller('claimsService')
export class ClaimsService {
  @Route()
  setupClaimsForToday() {
    return [];
  }

  @Route()
  claimCommissionForToday(commissionId: number) {
    return;
  }

  @Route()
  claimDailyBonusForToday() {
    return;
  }

  @Route()
  isTodaysBonusClaimed() {
    return false;
  }

  @Route()
  clearTodaysClaims() {
    return;
  }
}
