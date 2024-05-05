import { RewardService } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';

export function rewardService(): RewardService {
  return {
    async getAvailableRewards() {
      return await app.GetAvailableRewards();
    },
    async addReward(name: string, cost: number, imageBase64: string) {
      return await app.CreateReward(name, cost, imageBase64);
    },
    async deleteReward(id: number) {
      return await app.DeleteReward(id);
    },
  };
}
