import { RealmEntity, RewardEntity } from '../db';
import { Route, Controller } from '../router';

@Controller('rewardService')
export class RewardService {
  static instance: RewardService;

  constructor() {
    RewardService.instance = this;
  }

  @Route()
  async getAvailableRewards() {
    return RewardEntity.select('*');
  }

  @Route()
  async addReward(type: string, count: number, imageBase64: string) {
    return RewardEntity.insert({ type, count, imageBase64 });
  }

  @Route()
  async deleteReward(id: number) {
    return RewardEntity.delete(id);
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
