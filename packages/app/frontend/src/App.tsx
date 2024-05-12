import { MainPage } from '@dailies-tracker/ui';
import { Suspense } from 'react';

const App = () => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <MainPage />
  </Suspense>
);

export default App;
