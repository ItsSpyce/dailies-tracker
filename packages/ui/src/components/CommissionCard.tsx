import { DailyCommission } from '../types';
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
import { Reward } from './Reward';
import { Confirm } from './Confirm';
import { useConfirm } from '../hooks';
import { useCommissionService, useI18n } from '../states';

export type CommissionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  commission: DailyCommission;
  readOnly: boolean;
  onStatusChange?: (completed: boolean) => void;
};

export const CommissionCard: React.FC<CommissionCardProps> = ({
  commission,
  onStatusChange,
  readOnly,
  ...props
}) => {
  const [isCompleted, setIsCompleted] = useState(commission.completed);
  const [commissionService] = useCommissionService();
  const [confirmDelete, confirmDeleteProps] = useConfirm({
    async onConfirm() {
      if (commissionService != null) {
        await commissionService.deleteCommission(commission.id);
      }
    },
  });

  useEffect(() => {
    if (isCompleted !== commission.completed)
      setIsCompleted(commission.completed);
  }, [commission]);

  useEffect(() => {
    if (isCompleted === commission.completed) return;
    onStatusChange?.(isCompleted);
  }, [isCompleted]);

  return (
    <ContainerWithTail onClick={confirmDelete}>
      <Confirm
        title="app.dailies.deleteCommission"
        message="app.dailies.confirmDeleteCommission"
        {...confirmDeleteProps}
      />
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
          <CommissionRealm>
            {commission.realm ?? 'Realm of Missing Data'}
          </CommissionRealm>
        </CommissionCardText>
        <Rewards>
          {commission.rewards.map((reward) => (
            <Reward {...reward} />
          ))}
        </Rewards>
        <CompletedPanel>
          <Checkbox checked={isCompleted} readOnly={readOnly} />
        </CompletedPanel>
      </StyledCommissionCard>
    </ContainerWithTail>
  );
};
