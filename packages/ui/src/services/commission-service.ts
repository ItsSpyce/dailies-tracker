import { DailyCommission, TaskReward } from '../types';

export interface CommissionService {
  getCommissions: (unixDate: number) => Promise<DailyCommission[]>;
  addCommission: (
    description: string,
    realm: string,
    rewards: TaskReward[]
  ) => Promise<void>;
  updateCommission: (commission: DailyCommission) => Promise<void>;
  deleteCommission: (id: number) => Promise<void>;
}
