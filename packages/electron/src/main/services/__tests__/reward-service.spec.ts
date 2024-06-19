import { describe, test, expect, vi, beforeEach } from 'vitest';
import { RewardService } from '../reward-service';

describe('reward service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should get available rewards', async () => {
    const rewardService = new RewardService();
    await rewardService.getAvailableRewards();
  });

  test('should add a reward', async () => {
    const rewardService = new RewardService();
    await rewardService.addReward('description', 100, 'image');
  });

  test('should delete a reward', async () => {
    const rewardService = new RewardService();
    await rewardService.deleteReward(1);
  });
});
