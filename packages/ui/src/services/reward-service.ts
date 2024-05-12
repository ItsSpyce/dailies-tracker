import { TaskReward } from '../types';

export interface RewardService {
  getAvailableRewards(): Promise<TaskReward[]>;
  addReward(
    type: string,
    count: number,
    imageBase64: string
  ): Promise<TaskReward>;
  deleteReward(id: number): Promise<void>;
  claimDailyRewards(): Promise<void>;
  setupForNewDay(): Promise<TaskReward[]>;
}
