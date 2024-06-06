import { Route, Controller } from '../router';

@Controller('commissionService')
export class CommissionService {
  static instance: CommissionService;

  constructor() {
    CommissionService.instance = this;
  }

  @Route()
  getCommissions(date: string) {
    return [];
  }

  @Route()
  addCommission(description: string, realm: string, rewards: any[]) {
    return {};
  }

  @Route()
  deleteCommission(id: number) {
    return;
  }

  @Route()
  getAvailableRealms() {
    return [];
  }

  @Route()
  addRealm(realm: string) {
    return;
  }

  @Route()
  addRealms(realms: string[]) {
    return;
  }

  @Route()
  deleteRealm(realm: string) {
    return;
  }
}
