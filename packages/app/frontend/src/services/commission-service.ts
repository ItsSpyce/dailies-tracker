import { CommissionService } from '@dailies-tracker/ui';
import * as app from '@/internal/main/App';

export function commissionService(): CommissionService {
  return {
    async getCommissions(unixDate) {
      const results = await app.LoadCommissions(unixDate);
      return results.map((c) => ({
        ...c,
        rewards: JSON.parse(c.rewards),
      }));
    },
    async addCommission(description, realm, rewards) {
      const rewardsJson = JSON.stringify(rewards);
      await app.CreateTask(description, realm, rewardsJson);
    },
    async updateCommission(commission) {
      await app.CompleteTask(commission.id);
    },
    async deleteCommission(id) {
      await app.DeleteTask(id);
    },
  };
}
