import {
  ChooseDateForm,
  DailiesList,
  RightPanel,
  ExtraRewards,
  LeftPanel,
  StyledApp,
  DailiesView,
  SettingsButton,
} from './MainPage.styles';
import { useContext, useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
import { useModal, useLocalStorage } from '../hooks';
import { useCommissionService } from '../states';
import { DailyCommission, TaskReward } from '../types';
import { AddNewCommissionForm } from './AddNewCommissionForm';
import { Button, IconButton } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Checkbox } from './Checkbox';
import { CommissionCard } from './CommissionCard';
import { DatePicker } from './DatePicker';
import { I18n } from './I18n';
import { Label } from './Label';
import { Modal } from './Modal';
import { Notes } from './Notes';
import { Reward } from './Reward';
import { Rarity } from './Reward.styles';
import { Section } from './Section';
import { TaskCompletionStatus } from './TaskCompletionStatus';
import { Title } from './Title';
import { SettingsAndAboutModal } from './SettingsAndAboutModal';

const today = new Date();

export const MainPage = () => {
  const [commissions, setCommissions] = useState<DailyCommission[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [addNewCommissionModal, toggleCommissionModal] = useModal();
  const [settingsModal, toggleSettingsModal] = useModal();
  const [date, setDate] = useState(today);
  const [leftNotes, setLeftNotes] = useLocalStorage('notes-left', '');
  const [rightNotes, setRightNotes] = useLocalStorage('notes-right', '');
  const [commissionService] = useCommissionService();

  function markAsClaimed() {
    // TODO: store
    setIsClaimed((prev) => !prev);
  }

  async function onSubmitNewCommission(
    description: string,
    realm: string,
    rewards: TaskReward[]
  ) {
    const result = await commissionService.addCommission(
      description,
      realm,
      rewards
    );
    if (result?.id != null) {
      setCommissions([
        ...commissions,
        {
          id: result.id,
          description,
          realm,
          rewards,
          completed: false,
        },
      ]);
    }
    toggleCommissionModal();
  }

  async function onCommissionStatusChanged(completed: boolean, id: number) {
    await commissionService.markCommissionAsCompleted(id);
    setCommissions((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, completed };
        }
        return c;
      })
    );
  }

  useEffect(() => {
    commissionService.getCommissions(date.getTime()).then(setCommissions);
  }, [date]);

  return (
    <StyledApp>
      <LeftPanel>
        <Title
          header={<I18n iden="app.header" />}
          subHeader={<I18n iden="app.subHeader" />}
        />
        <TaskCompletionStatus
          totalTasks={commissions.length}
          completedTasks={commissions.filter((c) => c.completed).length}
        />
        <Section
          header={<I18n iden="app.dailies.bonusRewards" />}
          align="center"
        >
          <ExtraRewards>
            <Reward
              type="primos"
              amount={3000}
              rarity={Rarity.Legendary}
              size="lg"
            />
            <Reward type="arexp" amount={1000} rarity={Rarity.Rare} size="lg" />
            <Reward type="health" amount={1} rarity={Rarity.Rare} size="lg" />
          </ExtraRewards>
        </Section>
        <ButtonGroup direction="column">
          <Button
            onClick={markAsClaimed}
            disabled={commissions.some((c) => !c.completed)}
          >
            <Checkbox checked={isClaimed} />
            <I18n iden="app.dailies.claimed" />
          </Button>
        </ButtonGroup>
      </LeftPanel>
      <RightPanel>
        <ChooseDateForm>
          <I18n iden="app.chooseDate" />
          <DatePicker
            value={date}
            onChange={(e) => {
              setDate(e);
              console.log(e);
            }}
          />
        </ChooseDateForm>
        <DailiesList>
          <Label>
            <I18n iden="app.dailies.title" />
          </Label>
          <DailiesView>
            {commissions.length === 0 && (
              <p>
                <I18n iden="app.dailies.none" />
              </p>
            )}
            {commissions.map((commission) => (
              <CommissionCard
                key={commission.id}
                commission={commission}
                onStatusChange={(status) =>
                  onCommissionStatusChanged(status, commission.id)
                }
                readOnly={!dateFns.isSameDay(date, today)}
              />
            ))}
          </DailiesView>
        </DailiesList>
        <Button variant="secondary" onClick={toggleCommissionModal}>
          <I18n iden="app.dailies.addCommission" />
        </Button>
        <Modal {...addNewCommissionModal}>
          <Modal.Header showCloseButton>
            <I18n iden="app.dailies.addCommission" />
          </Modal.Header>
          <Modal.Body>
            <AddNewCommissionForm
              onSubmit={onSubmitNewCommission}
              onCancel={toggleCommissionModal}
            />
          </Modal.Body>
        </Modal>
        <Notes
          leftContent={leftNotes}
          rightContent={rightNotes}
          onChangeLeft={setLeftNotes}
          onChangeRight={setRightNotes}
        />
      </RightPanel>
      <SettingsButton>
        <IconButton icon="Settings" onClick={toggleSettingsModal} />
      </SettingsButton>
      <SettingsAndAboutModal {...settingsModal} />
    </StyledApp>
  );
};
