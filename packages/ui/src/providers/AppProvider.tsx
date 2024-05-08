import * as i18ns from '@dailies-tracker/i18n';
import { CommissionService, LangService } from '../services';
import { RewardService } from '../services/reward-service';
import { RecoilRoot, useRecoilState } from 'recoil';
import {
  CommissionServiceAtom,
  I18nAtom,
  LangServiceAtom,
  RewardServiceAtom,
  useLang,
} from '../states';
import { useEffect } from 'react';

interface ServiceBuilderFunction<T> {
  (): CouldBePromise<T>;
}

export interface AppProviderProps {
  children: React.ReactNode;
  commissionService: ServiceBuilderFunction<CommissionService>;
  rewardService: ServiceBuilderFunction<RewardService>;
  langService: ServiceBuilderFunction<LangService>;
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
  langService,
}) => {
  const [_commissionService, setCommissionService] = useRecoilState(
    CommissionServiceAtom
  );
  const [_rewardService, setRewardService] = useRecoilState(RewardServiceAtom);
  const [_langService, setLangService] = useRecoilState(LangServiceAtom);
  const [lang, setLang] = useLang();

  useEffect(() => {
    takeResult(commissionService).then(setCommissionService);
    const result = commissionService();
    if (result instanceof Promise) {
      result.then(setCommissionService);
    } else {
      setCommissionService(result);
    }
  }, [commissionService]);

  useEffect(() => {
    takeResult(rewardService).then(setRewardService);
  }, [rewardService]);

  useEffect(() => {
    takeResult(langService).then(setLangService);
  }, [langService]);

  return (
    <>
      {_commissionService && _rewardService && _langService && lang && children}
    </>
  );
};

function takeResult<T>(
  fn: (...args: any) => CouldBePromise<T>,
  ...args: any[]
): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        result.then(resolve).catch(reject);
      } else {
        resolve(result);
      }
    } catch (err) {
      reject(err);
    }
  });
}
