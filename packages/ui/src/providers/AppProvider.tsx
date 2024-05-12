import { CommissionService, RewardService, ClaimsService } from '../services';
import { RecoilRoot } from 'recoil';
import {
  ClaimsServiceContext,
  CommissionServiceContext,
  RewardServiceContext,
  useDayComingToEnd,
} from '../states';

export interface AppProviderProps {
  children: React.ReactNode;
  commissionService: CommissionService;
  rewardService: RewardService;
  claimsService: ClaimsService;
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
  claimsService,
}) => {
  const [dayComingToEnd] = useDayComingToEnd();
  return (
    <CommissionServiceContext.Provider value={commissionService}>
      <RewardServiceContext.Provider value={rewardService}>
        <ClaimsServiceContext.Provider value={claimsService}>
          {children}
        </ClaimsServiceContext.Provider>
      </RewardServiceContext.Provider>
    </CommissionServiceContext.Provider>
  );
};
