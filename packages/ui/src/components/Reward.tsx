import { match } from 'ts-pattern';
import { Rarity, RewardCount, RewardIcon, StyledReward } from './Reward.styles';
import { RewardType } from '../types';
import * as Images from '../images';

export { Rarity };

export interface RewardProps {
  type: RewardType;
  amount: number;
  rarity: Rarity;
  size?: 'sm' | 'md' | 'lg';
}

export const Reward: React.FC<RewardProps> = ({
  type,
  amount,
  rarity,
  size = 'md',
}) => {
  const iconSrc = match(type)
    .with('primos', () => Images.Primos)
    .with('cleaning_points', () => Images.CleanPoints)
    .with('health', () => Images.HealthPoints)
    .with('arexp', () => Images.ARExp)
    .with('creative_points', () => Images.CreativePoints)
    .otherwise(() => {
      throw new Error(`Unknown reward type: ${type}`);
    });
  return (
    <StyledReward rarity={rarity} size={size}>
      {iconSrc && (
        <RewardIcon src={typeof iconSrc === 'string' ? iconSrc : ''} />
      )}
      <RewardCount>{amount}</RewardCount>
    </StyledReward>
  );
};
