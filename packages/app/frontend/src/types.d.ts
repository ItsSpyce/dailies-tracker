export type DailyCommission = {
  id: number;
  description: string;
  completed: boolean;
  rewards: TaskReward[];
};

export type TaskReward = {
  type: RewardType;
  count: number;
};

export type RewardType =
  | 'primos'
  | 'coins'
  | 'arexp'
  | 'cleaning_points'
  | 'creative_points'
  | 'health';
