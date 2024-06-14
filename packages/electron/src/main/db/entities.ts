import { connect } from './connection';

const { table, column, initializeConnection } = connect();
export { initializeConnection };

export const RealmEntity = table('realm_entities', {
  name: column.text().unique(),
});

export const RewardEntity = table('reward_entities', {
  type: column.text(),
  count: column.int().default(0),
  imageBase64: column.text(),
});

export const CommissionEntity = table('commission_entities', {
  description: column.text(),
  realm: column.text(),
  rewards: column.text(),
});

export const CommissionClaimEntity = table('commission_claim_entities', {
  commissionId: column.int(),
  claimed: column.boolean(),
  dueDate: column.date(),
});

export const BonusClaimEntity = table('bonus_claim_entities', {
  rewards: column.text(),
  rewardCounts: column.text(),
});
