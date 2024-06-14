import type { Connection } from '../connection';

export interface Migration {
  up(): Promise<void>;
  down(): Promise<void>;
  get name(): string;
}

export interface MigrationModule {
  default(connection: Connection): Migration;
}
