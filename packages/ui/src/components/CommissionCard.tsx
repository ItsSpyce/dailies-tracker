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
import { useContext, useEffect, useState } from 'react';
import { ContainerWithTail } from './ContainerWithTail';
import { Rarity, Reward } from './Reward';
import { Modal } from './Modal';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { availableRealms } from '../consts';
import { Confirm } from './Confirm';
import { useConfirm } from '../hooks';
import { I18n } from './I18n';
import { useCommissionService } from '../states';

export type CommissionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  commission: DailyCommission;
  readOnly: boolean;
  onStatusChange?: (completed: boolean) => void;
};

const rewardRarity: Record<string, Rarity> = {
  primos: Rarity.Legendary,
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState(commission.description);
  const [newRealm, setNewRealm] = useState(commission.realm);
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
      <Modal
        isOpen={isEditModalOpen}
        closeRequested={() => setIsEditModalOpen(false)}
      >
        <Modal.Header showCloseButton>
          <I18n iden="app.dailies.editCommission" />
        </Modal.Header>
        <Modal.Body>
          <label>
            <I18n iden="app.fieldDescription" />
          </label>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <label>
            <I18n iden="app.fieldRealm" />
          </label>
          <Select
            value={newRealm}
            onChange={(e) => setNewRealm(e.currentTarget.value)}
          >
            {availableRealms.map((realm) => (
              <option key={realm} value={realm}>
                {realm}
              </option>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={() => setIsEditModalOpen(false)} variant="primary">
              <I18n iden="app.save" />
            </Button>
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="secondary"
            >
              <I18n iden="app.cancel" />
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
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
