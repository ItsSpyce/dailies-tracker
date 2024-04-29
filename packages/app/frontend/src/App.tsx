import { HashRouter } from 'react-router-dom';
import { PathRoutes } from './path-router';

function App() {
  return (
    <HashRouter>
      <PathRoutes pages={import.meta.glob('./**/pages/**/*')}></PathRoutes>
    </HashRouter>
  );
}

export default App;
