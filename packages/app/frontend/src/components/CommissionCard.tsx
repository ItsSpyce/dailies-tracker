import { DailyCommission, RewardType } from '@/types';
import {
  CommissionCardText,
  CommissionMarker,
  CommissionRealm,
  CommissionTitle,
  CompletedPanel,
  Rewards,
  StyledCommissionCard,
} from './CommissionCard.styles';
import { Checkbox } from './Checkbox';
import { useEffect, useState } from 'react';
import { ContainerWithTail } from './ContainerWithTail';
import { Rarity, Reward } from './Reward';

export type CommissionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  commission: DailyCommission;
  readOnly: boolean;
  onStatusChange?: (completed: boolean) => void;
};

const rewardRarity: Record<RewardType, Rarity> = {
  primos: Rarity.Legendary,
  coins: Rarity.Uncommon,
  arexp: Rarity.Epic,
  cleaning_points: Rarity.Rare,
  creative_points: Rarity.Rare,
  health: Rarity.Rare,
};

export const CommissionCard: React.FC<CommissionCardProps> = ({
  commission,
  onStatusChange,
  readOnly,
  ...props
}) => {
  const [isCompleted, setIsCompleted] = useState(commission.completed);

  useEffect(() => {
    if (isCompleted !== commission.completed)
      setIsCompleted(commission.completed);
  }, [commission]);

  useEffect(() => {
    if (isCompleted === commission.completed) return;
    onStatusChange?.(isCompleted);
  }, [isCompleted]);

  return (
    <ContainerWithTail>
      <StyledCommissionCard
        {...props}
        onClick={(e) => {
          if (readOnly) {
            return;
          }
          if (props.onClick) props.onClick(e);
          setIsCompleted((prev) => !prev);
        }}
      >
        <CommissionMarker></CommissionMarker>
        <CommissionCardText>
          <CommissionTitle>{commission.description}</CommissionTitle>
          <CommissionRealm>Realm of Spyce</CommissionRealm>
        </CommissionCardText>
        <Rewards>
          {commission.rewards.map((reward) => (
            <Reward
              key={reward.type}
              type={reward.type}
              amount={reward.count}
              rarity={rewardRarity[reward.type]}
            />
          ))}
        </Rewards>
        <CompletedPanel>
          <Checkbox checked={isCompleted} readOnly={readOnly} />
        </CompletedPanel>
      </StyledCommissionCard>
    </ContainerWithTail>
  );
};
