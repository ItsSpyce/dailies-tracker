import { CommissionService } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';

export async function commissionService(): Promise<CommissionService> {
  return {
    async getCommissions(unixDate) {
      const results = await app.LoadCommissions(unixDate);
      return results.map((result) => ({
        id: result.id,
        description: result.description,
        realm: result.realm,
        rewards: result.rewards,
        completed: result.completed,
      }));
    },
    async addCommission(description, realm, rewards) {
      return await app.CreateTask(description, realm, rewards);
    },
    async markCommissionAsCompleted(id) {
      await app.CompleteTask(id);
    },
    async deleteCommission(id) {
      await app.DeleteTask(id);
    },
    async markTodayAsClaimed() {
      //
    },
  };
}
