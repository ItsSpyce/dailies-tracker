import { RealmEntity } from '../db';
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
    return RealmEntity.select({ deletedAt: null });
  }

  @Route()
  addRealm(name: string) {
    return RealmEntity.insert({ name });
  }

  @Route()
  addRealms(names: string[]) {
    return Promise.all(names.map((name) => RealmEntity.insert({ name })));
  }

  @Route()
  deleteRealm(name: string) {
    return RealmEntity.delete({ name });
  }
}
