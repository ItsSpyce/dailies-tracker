import {
  MainPage,
  useAsyncState,
  useCommissionService,
  useI18n,
} from '@dailies-tracker/ui';
import { Suspense, useEffect } from 'react';

const App = () => {
  const commissionService = useCommissionService();
  const i18n = useI18n();
  const [availableRealms, setAvailableRealms] = useAsyncState(
    commissionService.getAvailableRealms
  );

  useEffect(() => {
    if (availableRealms?.length === 0) {
      console.log('No realms found, adding in defaults');
      commissionService.addRealms(i18n.realms);
    }
  }, [availableRealms]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <MainPage />
    </Suspense>
  );
};

export default App;
