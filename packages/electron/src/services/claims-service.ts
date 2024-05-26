import { Route, Controller } from '../main/router';
import * as dateFns from 'date-fns';

@Controller('claimsService')
export class ClaimsService {
  static instance: ClaimsService;

  constructor() {
    ClaimsService.instance = this;
  }

  @Route()
  setupClaimsForToday() {
    const dueDate = dateFns.startOfTomorrow();
    const now = new Date();

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
