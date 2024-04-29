import {
  ChooseDateForm,
  DailiesList,
  DailiesPanel,
  ExtraRewards,
  StatusPanel,
  StyledApp,
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
} from '@dailies-tracker/ui';

const today = new Date();

const App = () => {
  const [commissions, setCommissions] = useState<DailyCommission[]>([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCreatingNewCommission, setIsCreatingNewCommission] = useState(false);
  const [date, setDate] = useState(today);

  function markAsClaimed() {
    // TODO: store
    setIsClaimed((prev) => !prev);
  }

  async function onSubmitNewCommission(
    description: string,
    rewards: TaskReward[]
  ) {
    const rewardsJson = JSON.stringify(rewards);
    const result = await app.CreateTask(description, rewardsJson);
    if (result.id != null) {
      setCommissions([
        ...commissions,
        {
          id: result.id,
          description,
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
        rewards: JSON.parse(c.rewards),
        completed: c.completed,
      }))
    );
  }

  return (
    <StyledApp>
      <StatusPanel>
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
        <Button onClick={markAsClaimed}>
          <Checkbox checked={isClaimed} />
          <I18n iden="app.dailies.claimed" />
        </Button>
      </StatusPanel>
      <DailiesPanel>
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
        <Section header={<I18n iden="app.dailies.title" />} align="left">
          <DailiesList>
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
            {isCreatingNewCommission ? (
              <AddNewCommissionForm
                onSubmit={onSubmitNewCommission}
                onCancel={() => setIsCreatingNewCommission(false)}
              />
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsCreatingNewCommission(true)}
              >
                <I18n iden="app.dailies.addCommission" />
              </Button>
            )}
          </DailiesList>
        </Section>
        {!isCreatingNewCommission && <Notes />}
      </DailiesPanel>
    </StyledApp>
  );
};

export default App;
