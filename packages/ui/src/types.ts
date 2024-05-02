export type DailyCommission = {
  id: number;
  description: string;
  completed: boolean;
  realm: string;
  rewards: TaskReward[];
};

export type TaskReward = {
  type: RewardType;
  count: number;
};

export type RewardType =
  | 'primos'
  | 'arexp'
  | 'cleaning_points'
  | 'creative_points'
  | 'health';
