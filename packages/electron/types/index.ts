export type Reward = {
  id: number;
  type: string;
  count: number;
  imageBase64: string;
};

export type Commission = {
  id: number;
  description: string;
  realm: string;
  completed: boolean;
  rewards: Reward[];
};
