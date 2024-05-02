import {
  ChooseDateForm,
  DailiesList,
  RightPanel,
  ExtraRewards,
  LeftPanel,
  StyledApp,
  DailiesView,
} from './styles';
import { useEffect, useState } from 'react';
import * as app from '@/internal/main/App';
import { main } from '@/internal/models';
import * as dateFns from 'date-fns';
import {
  Title,
  I18n,
  TaskCompletionStatus,
  Section,
  Reward,
  Rarity,
  Button,
  Checkbox,
  DatePicker,
  CommissionCard,
  AddNewCommissionForm,
  Notes,
  DailyCommission,
  TaskReward,
  Label,
  Modal,
  useLocalStorage,
} from '@dailies-tracker/ui';

const today = new Date();

const App = () => {
  const [commissions, setCommissions] = useState<DailyCommission[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCreatingNewCommission, setIsCreatingNewCommission] = useState(false);
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
    const rewardsJson = JSON.stringify(rewards);
    const result = await app.CreateTask(description, realm, rewardsJson);
    if (result.id != null) {
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
    setIsCreatingNewCommission(false);
  }

  async function onCommissionStatusChanged(completed: boolean, id: number) {
    await app.CompleteTask(id);
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
    app.LoadCommissions(date.getTime()).then(updateCommissionsFromBe);
  }, [date]);

  function updateCommissionsFromBe(commissions: main.Commission[]) {
    setCommissions(
      commissions.map((c) => ({
        id: c.id,
        description: c.description,
        realm: c.realm,
        rewards: JSON.parse(c.rewards),
        completed: c.completed,
      }))
    );
  }

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
        <Button
          onClick={markAsClaimed}
          disabled={commissions.some((c) => !c.completed)}
        >
          <Checkbox checked={isClaimed} />
          <I18n iden="app.dailies.claimed" />
        </Button>
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
        <Button
          variant="secondary"
          onClick={() => setIsCreatingNewCommission(true)}
        >
          <I18n iden="app.dailies.addCommission" />
        </Button>
        <Modal isOpen={isCreatingNewCommission}>
          <Modal.Header showCloseButton>
            <I18n iden="app.dailies.addCommission" />
          </Modal.Header>
          <Modal.Body>
            <AddNewCommissionForm
              onSubmit={onSubmitNewCommission}
              onCancel={() => setIsCreatingNewCommission(false)}
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
    </StyledApp>
  );
};

export default App;
