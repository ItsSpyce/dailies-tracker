import { CommissionService } from '@dailies-tracker/ui';
import * as commissionServiceImpl from '@/internal/main/CommissionService';

export async function commissionService(): Promise<CommissionService> {
  return {
    async getCommissions(unixDate) {
      const results = await commissionServiceImpl.LoadCommissionsForDate(
        unixDate
      );
      return results.map((result) => ({
        id: result.id,
        description: result.description,
        realm: result.realm,
        rewards: result.rewards,
        completed: result.completed,
      }));
    },
    async addCommission(description, realm, rewards) {
      return await commissionServiceImpl.CreateNewCommission(
        description,
        realm,
        rewards
      );
    },
    async deleteCommission(id) {
      await commissionServiceImpl.DeleteCommission(id);
    },
    getAvailableRealms() {
      return commissionServiceImpl.GetAvailableRealms();
    },
    addRealm(realm) {
      return commissionServiceImpl.AddRealm(realm);
    },
    addRealms(realms) {
      return commissionServiceImpl.AddRealms(realms);
    },
    deleteRealm(realm) {
      return commissionServiceImpl.DeleteRealm(realm);
    },
  };
}
