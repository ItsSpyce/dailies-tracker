import path from 'path';
import * as sqlite3 from 'sqlite3';
import { appStorage } from '../consts';
import { initializeDatabase } from './factory';

const db = new sqlite3.Database(
  path.join(appStorage, 'database.sqlite'),
  sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
  (err) => {
    if (err != null) {
      console.error(err);
      throw err;
    }
  }
);
const { base, table, column } = initializeDatabase(db);

const BaseEntity = base({
  id: column.id(),
  createdAt: column.createdAt(),
  updatedAt: column.updatedAt(),
  deletedAt: column.deletedAt(),
}).mapsTo((entity) => ({
  id: entity.id,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
  deletedAt: entity.deletedAt,
}));

export const RealmEntity = table('realm_entities', {
  name: column.text().unique(),
})
  .mapsTo((entity) => ({
    name: entity.name,
  }))
  .extends(BaseEntity)
  .entity();

export const RewardEntity = table('reward_entities', {
  type: column.text(),
  count: column.int().default(0),
  imageBase64: column.text(),
})
  .extends(BaseEntity)
  .mapsTo((entity) => ({
    type: entity.type,
    count: entity.count,
    imageBase64: entity.imageBase64,
  }))
  .entity();

export const CommissionEntity = table('commission_entities', {
  description: column.text(),
  realm: column.text(),
  rewards: column.text(),
})
  .extends(BaseEntity)
  .mapsTo((entity) => ({
    description: entity.description,
    realm: entity.realm,
    rewards: entity.rewards,
  }))
  .entity();

export const CommissionClaimEntity = table('commission_claim_entities', {
  commissionId: column.int(),
  claimed: column.boolean(),
  dueDate: column.date(),
})
  .extends(BaseEntity)
  .mapsTo((entity) => ({
    commissionId: entity.commissionId,
    claimed: entity.claimed,
    dueDate: entity.dueDate,
  }))
  .entity();

export const BonusClaimEntity = table('bonus_claim_entities', {
  rewards: column.text(),
  rewardCounts: column.text(),
})
  .extends(BaseEntity)
  .mapsTo((entity) => ({
    rewards: entity.rewards,
    rewardCounts: entity.rewardCounts,
  }))
  .entity();
