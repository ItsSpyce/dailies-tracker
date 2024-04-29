import { useI18n } from '@/hooks';
import { I18nProvider } from '@/i18n/types';

export type I18nProps = {
  iden: Suggestion<keyof I18nProvider>;
};

export const I18n: React.FC<I18nProps> = ({ iden }) => {
  const i18n = useI18n();
  return <>{i18n[iden as keyof I18nProvider] ?? iden}</>;
};
