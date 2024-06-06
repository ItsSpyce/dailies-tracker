import { describe, test, expect, vi, beforeEach } from 'vitest';
vi.mock('../../db/factory', async (originalImport) => {
  const db = (await originalImport()) as any;
  return {
    ...db,
    initializeDatabase: () => {
      const inMemoryDatabase = new sqlite3.Database(':memory:');
      console.debug('Using in-memory database');
      return db.initializeDatabase(inMemoryDatabase);
    },
  };
});
vi.mock('sqlite3', async (originalImport) => {
  const { default: sqlite3 } = (await originalImport()) as any;
  const { MockDatabase } = await import('../../helpers/test-helpers');
  return {
    ...sqlite3,
    Database: MockDatabase,
  };
});
import * as sqlite3 from 'sqlite3';
import { RewardService } from '../reward-service';
import { MockDatabase } from '../../helpers/test-helpers';

describe('reward service', () => {
  beforeEach(() => {
    MockDatabase.resetMocks();
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

  test('should get available realms', async () => {
    const rewardService = new RewardService();
    await rewardService.getAvailableRealms();
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });

  test('should add a realm', async () => {
    const rewardService = new RewardService();
    await rewardService.addRealm('realm');
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });

  test('should add realms', async () => {
    const rewardService = new RewardService();
    await rewardService.addRealms(['realm1', 'realm2']);
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });

  test('should delete a realm', async () => {
    const rewardService = new RewardService();
    await rewardService.deleteRealm('realm');
    expect(MockDatabase.instance.all).toHaveBeenCalledOnce();
  });
});
