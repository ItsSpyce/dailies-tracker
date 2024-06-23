import { DailyCommission, TaskReward } from '../types';

export interface CommissionService {
  getCommissions(date: string): Promise<DailyCommission[]>;
  addCommission(
    description: string,
    realm: string,
    rewards: TaskReward[]
  ): Promise<DailyCommission>;
  deleteCommission(id: number): Promise<void>;
  getAvailableRealms(): Promise<
    {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date | null;
      deletedAt: Date | null;
    }[]
  >;
  addRealm(realm: string): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }>;
  addRealms(realms: string[]): Promise<void>;
  deleteRealm(realm: number): Promise<void>;
}
