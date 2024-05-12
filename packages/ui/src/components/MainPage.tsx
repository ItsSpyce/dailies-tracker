import {
  ChooseDateForm,
  DailiesList,
  RightPanel,
  ExtraRewards,
  LeftPanel,
  StyledApp,
  DailiesView,
} from './MainPage.styles';
import { useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
import { useModal, useAsyncState } from '../hooks';
import {
  LanguageSelector,
  useCommissionService,
  useRewardService,
} from '../states';
import { DailyCommission, TaskReward } from '../types';
import { AddNewCommissionForm } from './AddNewCommissionForm';
import { Button, TextButton } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Checkbox } from './Checkbox';
import { CommissionCard } from './CommissionCard';
import { DatePicker } from './DatePicker';
import { I18n } from './I18n';
import { Label } from './Label';
import { Modal } from './Modal';
import { Notes } from './Notes';
import { Reward } from './Reward';
import { Section } from './Section';
import { TaskCompletionStatus } from './TaskCompletionStatus';
import { Title } from './Title';
import { SettingsAndAboutModal } from './SettingsModal';
import { AboutModal } from './AboutModal';
import { DebugModal } from './DebugModal';
import { useRecoilValue } from 'recoil';

const today = new Date();

export const MainPage = () => {
  const commissionService = useCommissionService();
  const rewardService = useRewardService();
  const lang = useRecoilValue(LanguageSelector);
  const [commissions, setCommissions] = useState<DailyCommission[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [bonusRewards] = useAsyncState(rewardService.setupForNewDay);
  const [addNewCommissionModal, toggleCommissionModal] = useModal();
  const [settingsModal] = useModal();
  const [aboutModal] = useModal();
  const [debugModal] = useModal();
  const [date, setDate] = useState(today);

  async function markAsClaimed() {
    try {
      await rewardService.claimDailyRewards();
      setIsClaimed(true);
    } catch (e) {
      console.error(e);
    }
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

  async function onDeleteCommission(id: number) {
    await commissionService.deleteCommission(id);
    setCommissions((prev) => prev.filter((c) => c.id !== id));
  }

  useEffect(() => {
    commissionService.getCommissions(date.toISOString()).then(setCommissions);
  }, [date]);

  useEffect(() => {
    console.log('Bonus rewards', bonusRewards);
  }, [bonusRewards]);

  useEffect(() => {
    console.log('Commissions', commissions);
  }, [commissions]);

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
            {bonusRewards &&
              bonusRewards
                .sort((a, b) => b.count - a.count)
                .map((reward) => (
                  <Reward key={reward.id} {...reward} size="lg" />
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
                onDeleteRequested={onDeleteCommission}
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
        <Notes />
        <ButtonGroup>
          <TextButton noLine {...settingsModal.bind}>
            <I18n iden="app.settings" />
          </TextButton>
          <TextButton noLine {...aboutModal.bind}>
            <I18n iden="app.about" />
          </TextButton>
          {import.meta.env.DEV && (
            <TextButton noLine {...debugModal.bind}>
              Debug
            </TextButton>
          )}
        </ButtonGroup>
      </RightPanel>
      <SettingsAndAboutModal {...settingsModal} />
      <AboutModal {...aboutModal} />
      <DebugModal {...debugModal} />
    </StyledApp>
  );
};
