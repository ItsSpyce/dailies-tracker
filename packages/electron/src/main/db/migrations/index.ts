import { Connection } from '../connection';
import { MigrationModule } from './types';

export async function processMigrations(connection: Connection) {
  console.log('Processing migrations');
  const migrations = (await Promise.all([
    import('./20240607_13_55_InitialMigration'),
  ])) as MigrationModule[];
  const { table, column } = connection;
  const MigrationEntity = table('migrations', {
    name: column.text(),
  });
}
