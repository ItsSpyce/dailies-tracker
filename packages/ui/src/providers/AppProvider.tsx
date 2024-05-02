import { CommissionServiceContext } from '../contexts';
import { CommissionService } from '../services';

export interface AppProviderProps {
  children: React.ReactNode;
  commissionService: CommissionService;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  commissionService,
}) => (
  <CommissionServiceContext.Provider value={commissionService}>
    {children}
  </CommissionServiceContext.Provider>
);
