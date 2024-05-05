import { TaskReward } from '../types';
import { useContext, useEffect, useState } from 'react';
import {
  RewardSelectionColumn,
  RewardSelectionGroup,
  StyledAddNewCommissionForm,
} from './AddNewCommissionForm.styles';
import { Input } from './Input';
import { I18n } from './I18n';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Checkbox } from './Checkbox';
import { Select } from './Select';
import { availableRealms } from '../consts';
import { useI18n, useRewardService } from '../states';

export type AddNewCommissionFormProps = {
  onSubmit: (description: string, realm: string, rewards: TaskReward[]) => void;
  onCancel: () => void;
};

const rewardCounts: Record<string, number> = {
  primos: 400,
  arexp: 200,
  cleaning_points: 150,
  creative_points: 150,
  health: 100,
};

export const AddNewCommissionForm: React.FC<AddNewCommissionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [rewardService] = useRewardService();
  const [availableRewards, setAvailableRewards] = useState<TaskReward[]>([]);
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<TaskReward[]>([]);
  const [realm, setRealm] = useState('Realm of Duty');
  const [i18n] = useI18n();

  useEffect(() => {
    rewardService.getAvailableRewards().then((rewards) => {
      setAvailableRewards(rewards);
    });
  }, []);

  function bindToAddReward(type: string) {
    return () => {
      const count = rewardCounts[type];
      setRewards((prev) => {
        const index = prev.findIndex((r) => r.type === type);
        if (index === -1) {
          return [...prev, { id: 0, type, count, imageBase64: '' }];
        }
        return prev.filter((r) => r.type !== type);
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
      <Select onChange={(e) => setRealm(e.currentTarget.value)}>
        <option disabled>Select a Realm</option>
        {availableRealms.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </Select>
      <RewardSelectionGroup>
        {availableRewards.map((r) => (
          <Checkbox
            checked={rewards.some((reward) => reward.type === r.type)}
            onChange={bindToAddReward(r.type)}
            key={r.id}
          >
            {r.type}
          </Checkbox>
        ))}
      </RewardSelectionGroup>
      <ButtonGroup>
        <Button
          onClick={() => {
            onSubmit(description, realm, rewards);
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
