import { I18nProvider, enUS } from '@dailies-tracker/i18n';
import { createContext } from 'react';
import { CommissionService } from './services/commission-service';

export const I18nContext = createContext<I18nProvider>(enUS);
export const CommissionServiceContext = createContext<CommissionService | null>(
  null
);
