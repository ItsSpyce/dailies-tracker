import { RewardType, TaskReward } from '../types';
import { useState } from 'react';
import {
  RewardSelectionColumn,
  RewardSelectionGroup,
  StyledAddNewCommissionForm,
} from './AddNewCommissionForm.styles';
import { Input } from './Input';
import { useI18n } from '../hooks';
import { I18n } from './I18n';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Checkbox } from './Checkbox';

export type AddNewCommissionFormProps = {
  onSubmit: (description: string, rewards: TaskReward[]) => void;
  onCancel: () => void;
};

const rewardCounts: Record<RewardType, number> = {
  primos: 400,
  coins: 50000,
  arexp: 200,
  cleaning_points: 150,
  creative_points: 150,
  health: 100,
};

export const AddNewCommissionForm: React.FC<AddNewCommissionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<TaskReward[]>([]);
  const i18n = useI18n();

  function bindToAddReward(type: RewardType) {
    return () => {
      const count = rewardCounts[type];
      setRewards((prev) => {
        const index = prev.findIndex((r) => r.type === type);
        if (index === -1) {
          return [...prev, { type, count }];
        }
        return prev.map((r, i) => {
          if (i === index) {
            return { type, count };
          }
          return r;
        });
      });
    };
  }

  return (
    <StyledAddNewCommissionForm>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={i18n['app.addCommission.description']}
      />
      <RewardSelectionGroup>
        <RewardSelectionColumn>
          <Checkbox
            checked={rewards.some((r) => r.type === 'primos')}
            onChange={bindToAddReward('primos')}
          >
            <I18n iden="rewards.primos" />
          </Checkbox>
          <Checkbox
            checked={rewards.some((r) => r.type === 'coins')}
            onChange={bindToAddReward('coins')}
          >
            <I18n iden="rewards.coins" />
          </Checkbox>
          <Checkbox
            checked={rewards.some((r) => r.type === 'arexp')}
            onChange={bindToAddReward('arexp')}
          >
            <I18n iden="rewards.arexp" />
          </Checkbox>
        </RewardSelectionColumn>
        <RewardSelectionColumn>
          <Checkbox
            checked={rewards.some((r) => r.type === 'cleaning_points')}
            onChange={bindToAddReward('cleaning_points')}
          >
            <I18n iden="rewards.cleaningPoints" />
          </Checkbox>
          <Checkbox
            checked={rewards.some((r) => r.type === 'creative_points')}
            onChange={bindToAddReward('creative_points')}
          >
            <I18n iden="rewards.creativePoints" />
          </Checkbox>
          <Checkbox
            checked={rewards.some((r) => r.type === 'health')}
            onChange={bindToAddReward('health')}
          >
            <I18n iden="rewards.health" />
          </Checkbox>
        </RewardSelectionColumn>
      </RewardSelectionGroup>
      <ButtonGroup>
        <Button
          onClick={() => {
            onSubmit(description, rewards);
          }}
          variant="primary"
        >
          <I18n iden="app.create" />
        </Button>
        <Button
          onClick={() => {
            setDescription('');
            setRewards([]);
            onCancel();
          }}
          variant="secondary"
        >
          <I18n iden="app.cancel" />
        </Button>
      </ButtonGroup>
    </StyledAddNewCommissionForm>
  );
};
