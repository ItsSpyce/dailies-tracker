import { vi } from 'vitest';
vi.mock('../db/factory', async (originalImport) => {
  const db = (await originalImport()) as any;
  return {
    ...db,
    initializeDatabase: () => {
      const mockDatabase = new MockDatabase();
      console.debug('Using in-memory database');
      return db.initializeDatabase(mockDatabase);
    },
  };
});
import * as sqlite3 from 'sqlite3';

export class MockDatabase {
  static instance: MockDatabase;

  readonly all = vi.fn(
    (script: string, callback: (err: any, rows: unknown[]) => void) => {
      callback(null, []);
    }
  );
  readonly exec = vi.fn((script: string, callback: (err: any) => void) => {
    callback(null);
  });
  _db = new sqlite3.Database(':memory:');

  constructor() {
    MockDatabase.instance = this;
  }

  static resetMocks() {
    MockDatabase.instance.all.mockClear();
    MockDatabase.instance.exec.mockClear();
    MockDatabase.instance._db.close();
    MockDatabase.instance._db = new sqlite3.Database(':memory:');
  }
}
