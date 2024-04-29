import { createContext } from 'react';
import { enUs } from './i18n';
import { I18nProvider } from './i18n/types';

export const I18nContext = createContext<I18nProvider>(enUs);
