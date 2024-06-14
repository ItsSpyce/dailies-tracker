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
  async getAvailableRealms() {
    return RealmEntity.select('*');
  }

  @Route()
  async addRealm(name: string) {
    return RealmEntity.insert({ name });
  }

  @Route()
  async addRealms(names: string[]) {
    return RealmEntity.batchInsert(names.map((name) => ({ name })));
  }

  @Route()
  async deleteRealm(name: string) {
    return RealmEntity.delete({ name });
  }
}
