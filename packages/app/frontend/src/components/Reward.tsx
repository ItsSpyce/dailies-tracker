import { match } from 'ts-pattern';
import { Rarity, RewardCount, RewardIcon, StyledReward } from './Reward.styles';
import { RewardType } from '@/types';

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
    .with('primos', () => '/images/icons/primos.png')
    .with('coins', () => '/images/icons/coins.png')
    .with('health', () => '/images/icons/buff_recovery.png')
    .otherwise(() => '');
  return (
    <StyledReward rarity={rarity} size={size}>
      {iconSrc && (
        <RewardIcon src={typeof iconSrc === 'string' ? iconSrc : ''} />
      )}
      <RewardCount>{amount}</RewardCount>
    </StyledReward>
  );
};
