import { useCallback, useEffect, useState } from 'react';
import * as dateFns from 'date-fns';
import {
  useCommissionService,
  useDailyCheckTimer,
  useDayComingToEnd,
  useI18n,
  useShouldNotify,
} from '../states';

export function usePrepareDailiesTimer() {
  const i18n = useI18n();
  const commissionService = useCommissionService();
  const [dayComingToEnd] = useDayComingToEnd();
  const [timer, setTimer] = useDailyCheckTimer();
  const [hasNotificationPermission, setHasNotificationPermission] = useState(
    Notification.permission === 'granted'
  );
  const [shouldNotify] = useShouldNotify();
  const notify = useCallback(async () => {
    if (!shouldNotify) {
      return;
    }
    if (hasNotificationPermission) {
      const remainingTasks = (
        await commissionService.getCommissions(Date.now())
      ).filter((c) => !c.completed);
      if (remainingTasks.length === 0) {
        return;
      }
      console.log('Remaining tasks', remainingTasks);
      // new Notification(
      //   `Finish your last ${
      //     remainingTasks.length === 1
      //       ? 'task'
      //       : `${remainingTasks.length} tasks`
      //   } before the day finishes!`,
      //   {
      //     body: "You're coming up on the end of the day. Finish them to claim your bonus rewards!",
      //     lang: 'en-US',
      //     requireInteraction: false,
      //   }
      // ).onclick = () => {
      //   // I dunno
      // };
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setHasNotificationPermission(true);
          notify();
        }
      });
    }
  }, [hasNotificationPermission, commissionService, shouldNotify]);

  useEffect(() => {
    if (timer != null) {
      clearInterval(timer);
      setTimer(null);
    }
    if (!shouldNotify) {
      return;
    }
    setTimer(
      setInterval(() => {
        const now = new Date();
        const tomorrowStart = dateFns.startOfDay(dateFns.addDays(now, 1));
        const timeUntilTomorrow = tomorrowStart.getTime() - now.getTime();
        if (timeUntilTomorrow < dayComingToEnd) {
          notify();
          clearInterval(timer!);
        }
      }, 1000 * 5)
    );
    return () => {
      timer && clearInterval(timer);
      setTimer(null);
    };
  }, [shouldNotify]);

  return notify;
}
