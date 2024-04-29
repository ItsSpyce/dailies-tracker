import { useContext } from 'react';
import { I18nContext } from '@/contexts';

export function useI18n() {
  return useContext(I18nContext);
}
