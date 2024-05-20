import { RewardService } from '@dailies-tracker/ui';

export async function rewardService(): Promise<RewardService> {
  return {
    async getAvailableRewards() {
      return window.rewardService.getAvailableRewards();
    },
    async addReward(description, realm, imageBase64) {
      return window.rewardService.addReward(description, realm, imageBase64);
    },
    async deleteReward(id) {
      return window.rewardService.deleteReward(id);
    },
  };
}
