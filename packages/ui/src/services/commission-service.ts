import { DailyCommission, TaskReward } from '../types';

export interface CommissionService {
  getCommissions(unixDate: number): Promise<DailyCommission[]>;
  addCommission(
    description: string,
    realm: string,
    rewards: TaskReward[]
  ): Promise<DailyCommission>;
  markCommissionAsCompleted(id: number): Promise<void>;
  deleteCommission(id: number): Promise<void>;
  setupForNewDay(): Promise<void>;
}
