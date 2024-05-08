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
import { useModal, useLocalStorage, useAsyncState } from '../hooks';
import {
  useCommissionService,
  useLang,
  useLangService,
  useRewardService,
} from '../states';
import { DailyCommission, TaskReward } from '../types';
import { AddNewCommissionForm } from './AddNewCommissionForm';
import { Button, IconButton, TextButton } from './Button';
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
import { SettingsAndAboutModal } from './SettingsModal';
import { Heart } from 'react-feather';
import { AboutModal } from './AboutModal';

const today = new Date();

export const MainPage = () => {
  const [commissionService] = useCommissionService();
  const [rewardService] = useRewardService();
  const [lang] = useLang();
  const [commissions, setCommissions] = useState<DailyCommission[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [availableRewards] = useAsyncState(rewardService.getAvailableRewards);
  const [addNewCommissionModal, toggleCommissionModal] = useModal();
  const [settingsModal, toggleSettingsModal] = useModal();
  const [aboutModal, toggleAboutModal] = useModal();
  const [date, setDate] = useState(today);
  const [leftNotes, setLeftNotes] = useLocalStorage('notes-left', '');
  const [rightNotes, setRightNotes] = useLocalStorage('notes-right', '');

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
            {availableRewards &&
              availableRewards.map((reward) => (
                <Reward
                  key={reward.id}
                  {...reward}
                  count={reward.count * 5}
                  size="lg"
                />
              ))}
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
          <TextButton noLine {...aboutModal.bind}>
            About
          </TextButton>
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
            lang={lang.replace('_', '-')}
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
        <Button variant="secondary" {...addNewCommissionModal.bind}>
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
        <IconButton icon="Settings" {...settingsModal.bind} />
      </SettingsButton>
      <SettingsAndAboutModal {...settingsModal} />
      <AboutModal {...aboutModal} />
    </StyledApp>
  );
};
