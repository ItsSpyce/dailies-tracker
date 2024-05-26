import { column, createBaseSchema, table } from './table-builder';

const BaseEntity = createBaseSchema({
  id: column.id(),
  createdAt: column.date('created_at').default('datetime("now")'),
  updatedAt: column.date('updated_at').nullable(),
  deletedAt: column.date('deleted_at').nullable(),
}).mapsTo((entity) => ({
  id: entity.id,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
  deletedAt: entity.deletedAt,
}));

export const RealmEntity = table('realm_entities', {
  name: column.text('name').unique(),
})
  .mapsTo((entity) => ({
    name: entity.name,
  }))
  .extends(BaseEntity)
  .seal();

export const RewardEntity = table('reward_entities', {
  type: column.text('type'),
  count: column.int('count').default(0),
  imageBase64: column.text('image_base64'),
})
  .mapsTo((entity) => ({
    type: entity.type,
    count: entity.count,
    imageBase64: entity.imageBase64,
  }))
  .extends(BaseEntity)
  .seal();

export const CommissionEntity = table('commission_entities', {
  description: column.text('description'),
  realm: column.text('realm'),
  rewards: column.text('rewards'),
})
  .mapsTo((entity) => ({
    description: entity.description,
    realm: entity.realm,
    rewards: entity.rewards,
  }))
  .extends(BaseEntity)
  .seal();

export const CommissionClaimEntity = table('commission_claim_entities', {
  commissionId: column.int('commission_id'),
  claimed: column.boolean('claimed'),
  dueDate: column.date('due_date'),
})
  .mapsTo((entity) => ({
    commissionId: entity.commissionId,
    claimed: entity.claimed,
    dueDate: entity.dueDate,
  }))
  .extends(BaseEntity)
  .seal();

export const BonusClaimEntity = table('bonus_claim_entities', {
  rewards: column.text('rewards'),
  rewardCounts: column.text('reward_counts'),
})
  .mapsTo((entity) => ({
    rewards: entity.rewards,
    rewardCounts: entity.rewardCounts,
  }))
  .extends(BaseEntity)
  .seal();
