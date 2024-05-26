import { RewardEntity, sql } from '../main/db';
import { Route, Controller } from '../main/router';
import { TaskReward } from '@dailies-tracker/ui';

@Controller('rewardService')
export class RewardService {
  static instance: RewardService;

  constructor() {
    RewardService.instance = this;
  }

  @Route()
  async getAvailableRewards() {
    const rewards =
      await sql`SELECT * FROM ${RewardEntity} WHERE ${RewardEntity.id} > 0`;
    return [];
  }

  @Route()
  async addReward(description: string, realm: string, imageBase64: string) {
    return {};
  }

  @Route()
  deleteReward(id: number) {
    return;
  }

  @Route()
  getAvailableRealms() {
    return [];
  }

  @Route()
  async addRealm(name: string) {
    return {};
  }

  @Route()
  async addRealms(names: string[]) {
    return [];
  }

  @Route()
  deleteRealm(realm: string) {
    return;
  }
}
