import { CommissionService } from '@dailies-tracker/ui';

export async function commissionService(): Promise<CommissionService> {
  return {
    async getCommissions(unixDate) {
      return window.commissionService.getCommissions(unixDate);
    },
    async addCommission(description, realm, rewards) {
      return window.commissionService.addCommission(
        description,
        realm,
        rewards
      );
    },
    async deleteCommission(id) {
      return window.commissionService.deleteCommission(id);
    },
    getAvailableRealms() {
      return window.commissionService.getAvailableRealms();
    },
    addRealm(realm) {
      return window.commissionService.addRealm(realm);
    },
    addRealms(realms) {
      return window.commissionService.addRealms(realms);
    },
    deleteRealm(realm) {
      return window.commissionService.deleteRealm(realm);
    },
  };
}
