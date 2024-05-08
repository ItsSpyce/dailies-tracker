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
import { useI18n, useRewardService, useAvailableRealms } from '../states';

export type AddNewCommissionFormProps = {
  onSubmit: (description: string, realm: string, rewards: TaskReward[]) => void;
  onCancel: () => void;
};

export const AddNewCommissionForm: React.FC<AddNewCommissionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [rewardService] = useRewardService();
  const [availableRewards, setAvailableRewards] = useState<TaskReward[]>([]);
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<number[]>([]);
  const [realms] = useAvailableRealms();
  const [realm, setRealm] = useState(realms[0]);
  const i18n = useI18n();

  useEffect(() => {
    rewardService.getAvailableRewards().then((rewards) => {
      setAvailableRewards(rewards);
    });
  }, []);

  function bindToAddReward(id: number) {
    return () => {
      const count = availableRewards.find((r) => r.id === id);
      if (count == null) {
        console.error('Reward not found', id);
        return;
      }
      if (rewards.includes(id)) {
        setRewards(rewards.filter((r) => r !== id));
      } else {
        setRewards([...rewards, id]);
      }
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
        {realms.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </Select>
      <RewardSelectionGroup>
        {availableRewards.map((r) => (
          <Checkbox
            checked={rewards.some((id) => id === r.id)}
            onChange={bindToAddReward(r.id)}
            key={r.id}
          >
            {r.type}
          </Checkbox>
        ))}
      </RewardSelectionGroup>
      <ButtonGroup>
        <Button
          onClick={() => {
            onSubmit(
              description,
              realm,
              rewards.map((id) => availableRewards.find((r) => r.id === id)!)
            );
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
