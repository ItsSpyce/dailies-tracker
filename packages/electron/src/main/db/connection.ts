import * as sqlite3 from 'sqlite3';
import path from 'path';
import { appStorage } from '../consts';

const storage = path.join(appStorage, 'database.sqlite');

let sqlConnection: sqlite3.Database | null = null;

export function setupDb(): Promise<void> {
  console.debug('Using application storage at', appStorage);
  return new Promise<void>((resolve, reject) => {
    sqlConnection = new sqlite3.Database(
      storage,
      sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
      (err) => {
        if (err != null) {
          reject(err);
        }
        resolve();
      }
    );
  });
}

// ORMs suck so I'm using my own thing
export function sql(script: TemplateStringsArray, ...args: any[]) {
  if (!sqlConnection) {
    throw new Error('SQL connection not initialized');
  }
  return new Promise((resolve, reject) => {
    // iterate through args and replace the placeholders with the column name if the arg extends SqlEntity
    const query = script.reduce((acc, part, i) => {
      return acc + part + (args[i] ?? '');
    }, '');
  });
}
