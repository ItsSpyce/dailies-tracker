import { CommissionService, RewardService, ClaimsService } from '../services';
import { RecoilRoot, useRecoilValue } from 'recoil';
import {
  ClaimsServiceContext,
  CommissionServiceContext,
  RewardServiceContext,
  TimeBeforeAlertingSelector,
} from '../states';
import { useEffect, useState } from 'react';
import * as dateFns from 'date-fns';

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
  const [dailiesTimer, setDailiesTimer] = useState<NodeJS.Timeout | null>(null);
  const [deadline, setDeadline] = useState(dateFns.startOfTomorrow());
  const [hasReminded, setHasReminded] = useState(false);
  const remindMeTime = useRecoilValue(TimeBeforeAlertingSelector);

  useEffect(() => {
    if (dailiesTimer != null) {
      clearInterval(dailiesTimer);
    }
    setDailiesTimer(() =>
      setInterval(() => {
        const now = new Date();
        if (dateFns.isAfter(now, deadline)) {
          // update deadline
          setDeadline(dateFns.startOfTomorrow());
          setHasReminded(false);
          notify('Dailies have been reset for today!');
          return;
        }
        if (hasReminded) {
          return;
        }
        const diff = dateFns.differenceInMilliseconds(deadline, now);
        if (diff < remindMeTime) {
          // show reminder
          setHasReminded(true);
          notify(
            'Finish your remaining dailies before the day finishes and claim your bonus rewards!'
          );
        }
      }, 1000 * 60)
    );

    return () => {
      if (dailiesTimer != null) {
        clearInterval(dailiesTimer);
      }
    };
  }, [commissionService, rewardService, claimsService, remindMeTime]);

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

async function notify(message: string) {
  const permission =
    Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;
  // if (permission === 'granted') {
  //   new Notification('Dailies tracker', { body: message });
  // }
}
