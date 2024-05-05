import * as i18ns from '@dailies-tracker/i18n';
import { CommissionService, LangService } from '../services';
import { RewardService } from '../services/reward-service';
import { RecoilRoot, useRecoilState } from 'recoil';
import {
  CommissionServiceAtom,
  I18nAtom,
  LangServiceAtom,
  RewardServiceAtom,
} from '../states';
import { useEffect } from 'react';

export interface AppProviderProps {
  children: React.ReactNode;
  commissionService: CommissionService;
  rewardService: RewardService;
  langService: LangService;
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
  const [locale, setLocale] = useRecoilState(I18nAtom);

  useEffect(() => {
    setCommissionService(commissionService);
  }, [commissionService]);

  useEffect(() => {
    setRewardService(rewardService);
  }, [rewardService]);

  useEffect(() => {
    setLangService(langService);
    // @ts-ignore
    langService.getLang().then((lang) => setLocale(i18ns[lang] ?? i18ns.enUS));
  }, [langService]);

  return (
    <>
      {_commissionService &&
        _rewardService &&
        _langService &&
        locale &&
        children}
    </>
  );
};
