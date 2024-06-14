import { describe, test, expect, vi, beforeEach } from 'vitest';
import { RewardService } from '../reward-service';
import { MockDatabase } from '../../helpers/test-helpers';
import { connect } from '../../db';

const setupMockDb = () => {
  const result = connect();
  result.initializeConnection(':memory:');
  return result;
};

describe('reward service', () => {
  beforeEach(() => {
    setupMockDb();
  });

  test('should get available rewards', async () => {
    const rewardService = new RewardService();
    await rewardService.getAvailableRewards();
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });

  test('should add a reward', async () => {
    const rewardService = new RewardService();
    await rewardService.addReward('description', 100, 'image');
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });

  test('should delete a reward', async () => {
    const rewardService = new RewardService();
    await rewardService.deleteReward(1);
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });
});
