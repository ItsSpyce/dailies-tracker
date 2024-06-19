import { RewardEntity } from '../db';
import { Route, Controller } from '../router';

@Controller('rewardService')
export class RewardService {
  static instance: RewardService;

  constructor() {
    RewardService.instance = this;
  }

  @Route()
  async getAvailableRewards() {
    return RewardEntity.select({ deletedAt: null });
  }

  @Route()
  async addReward(type: string, count: number, imageBase64: string) {
    return RewardEntity.insert({ type, count, imageBase64 });
  }

  @Route()
  async deleteReward(id: number) {
    return RewardEntity.delete({ id });
  }
}
