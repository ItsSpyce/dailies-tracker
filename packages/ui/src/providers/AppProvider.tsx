import { CommissionService } from '../services';
import { RewardService } from '../services/reward-service';
import { RecoilRoot } from 'recoil';
import {
  CommissionServiceContext,
  RewardServiceContext,
  useDayComingToEnd,
} from '../states';

export interface AppProviderProps {
  children: React.ReactNode;
  commissionService: CommissionService;
  rewardService: RewardService;
}

export const AppProvider: React.FC<AppProviderProps> = (props) => (
  <RecoilRoot>
    <InternalAppRenderer {...props} />
  </RecoilRoot>
);

const InternalAppRenderer: React.FC<AppProviderProps> = ({
  children,
  commissionService,
  rewardService,
}) => {
  const [dayComingToEnd] = useDayComingToEnd();
  return (
    <CommissionServiceContext.Provider value={commissionService}>
      <RewardServiceContext.Provider value={rewardService}>
        {children}
      </RewardServiceContext.Provider>
    </CommissionServiceContext.Provider>
  );
};
