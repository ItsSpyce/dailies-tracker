export type DailyCommission = {
  id: number;
  description: string;
  completed: boolean;
  realm: string;
  rewards: TaskReward[];
};

export type TaskReward = {
  id: number;
  type: string;
  count: number;
  imageBase64: string;
};
