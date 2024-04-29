import { I18nProvider, enUS } from '@dailies-tracker/i18n';
import { createContext } from 'react';

export const I18nContext = createContext<I18nProvider>(enUS);
