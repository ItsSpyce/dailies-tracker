import { match } from 'ts-pattern';
import { Rarity, RewardCount, RewardIcon, StyledReward } from './Reward.styles';
import * as Images from '../images';

export { Rarity };

export interface RewardProps {
  type: string;
  count: number;
  imageBase64: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Reward: React.FC<RewardProps> = ({ imageBase64, count, size }) => (
  <StyledReward size={size}>
    <RewardIcon src={imageBase64} />
    <RewardCount>{count}</RewardCount>
  </StyledReward>
);
