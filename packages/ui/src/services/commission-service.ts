import { DailyCommission, TaskReward } from '../types';

export interface CommissionService {
  getCommissions(date: string): Promise<DailyCommission[]>;
  addCommission(
    description: string,
    realm: string,
    rewards: TaskReward[]
  ): Promise<DailyCommission>;
  deleteCommission(id: number): Promise<void>;
  getAvailableRealms(): Promise<string[]>;
  addRealm(realm: string): Promise<void>;
  addRealms(realms: string[]): Promise<void>;
  deleteRealm(realm: string): Promise<void>;
}
