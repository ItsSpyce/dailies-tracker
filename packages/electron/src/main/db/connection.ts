import { EventEmitter } from 'events';
import sqlite3 from 'sqlite3';
import * as columns from './columns';
import { Table } from './table';
import { parameterizeScript } from './utils';

type Enum = Record<string | symbol, string | number>;

type QueryableTable<T extends Table<any>> = T extends Table<infer U>
  ? T & {
      [K in keyof U]: U[K] extends columns.Column<any, string, any>
        ? U[K]
        : never;
    }
  : never;

type Columns = {
  text<TName extends string>(name?: TName): columns.TextColumn<TName>;
  int<TName extends string>(name?: TName): columns.IntColumn<TName>;
  boolean<TName extends string>(name?: TName): columns.BooleanColumn<TName>;
  real<TName extends string>(name?: TName): columns.RealColumn<TName>;
  blob<TName extends string>(name?: TName): columns.BlobColumn<TName>;
  date<TName extends string>(name?: TName): columns.DateColumn<TName>;
  enum<TEnum extends Enum, TName extends string>(
    enumType: TEnum,
    name?: TName
  ): columns.EnumColumn<TEnum, TName>;
};

const tableFields = {
  id: new columns.IntColumn('id').primaryKey(),
  createdAt: new columns.DateColumn('created_at').defaultNow(),
  updatedAt: new columns.DateColumn('updated_at').nullable(),
  deletedAt: new columns.DateColumn('deleted_at').nullable(),
};

export interface Connection {
  initializeConnection(filename: string): void;
  execute(sql: string, values: any[]): Promise<any[]>;
  table<
    T extends Record<string, columns.Column<any, string, any>>,
    TName extends string = string
  >(
    name: TName,
    columns: T
  ): QueryableTable<Table<typeof tableFields & T>>;
  get column(): Columns;
}

class Queue {
  private _queue: (() => Promise<void>)[] = [];
  private _running = false;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this._queue.push(async () => {
        try {
          resolve(await fn());
        } catch (e) {
          reject(e);
        }
      });

      if (!this._running) {
        this._running = true;
        this._run();
      }
    });
  }

  private async _run() {
    while (this._queue.length > 0) {
      const fn = this._queue.shift()!;
      await fn();
    }
    this._running = false;
  }
}

type LazyConnectionEventMap = {
  error: [error: Error];
  ready: [];
  tablesInitialized: [tables: Map<string, Table<any>>];
};

class LazyConnection
  extends EventEmitter<LazyConnectionEventMap>
  implements Connection
{
  private _tables = new Map<string, Table<any>>();
  private _queue = new Queue();
  private _db: sqlite3.Database | null = null;

  column = {
    text: (name?) => new columns.TextColumn(name),
    int: (name?) => new columns.IntColumn(name),
    boolean: (name?) => new columns.BooleanColumn(name),
    real: (name?) => new columns.RealColumn(name),
    blob: (name?) => new columns.BlobColumn(name),
    date: (name?) => new columns.DateColumn(name),
    enum: (enumType, name?) => new columns.EnumColumn(name, enumType),
  };

  constructor() {
    super();
    this.on('error', (err) => {
      console.error(err);
    });
    this.on('ready', async () => {
      for (const [name, table] of this._tables) {
        // if the table doesn't exist, make it
        const columnDeclarations: string[] = [];
        for (const [_, column] of Object.entries(table._schema)) {
          if (column instanceof columns.Column) {
            columnDeclarations.push(
              [
                column._columnName,
                column._columnType,
                column._isNullable ? 'NULL' : false,
                column._isPrimaryKey ? 'PRIMARY KEY' : false,
                column._isUnique ? 'UNIQUE' : false,
              ]
                .filter(Boolean)
                .join(' ')
            );
          }
        }
        const script = `CREATE TABLE IF NOT EXISTS ${name} (${columnDeclarations.join(
          ', '
        )})`;
        await this.execute(script, []);
      }
    });
    this.on('tablesInitialized', () => {});
  }

  initializeConnection = (filename: string) => {
    try {
      this._db = new sqlite3.Database(
        filename,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
          if (err) {
            this.emit('error', err);
          } else {
            this.emit('ready');
          }
        }
      );
    } catch (err) {
      this.emit('error', err);
    }
  };

  table = <
    T extends Record<string, columns.Column<any, string, any>>,
    TName extends string = string
  >(
    name: TName,
    columns: T
  ): QueryableTable<Table<typeof tableFields & T>> => {
    const table = new Table(
      name,
      {
        ...tableFields,
        ...columns,
      },
      this
    );
    this._tables.set(name, table);
    return {
      ...table,
      ...(tableFields as any),
      ...(columns as any),
    };
  };

  execute = (script: string, args: any[]): Promise<any[]> => {
    return this._queue.add(async () => {
      return new Promise((resolve, reject) => {
        console.debug(script, args);
        this._db.all(script, args, (err, rows) => {
          if (err) {
            reject(err);
            this.emit('error', err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  };
}

export function connect(): Connection {
  const connection = new LazyConnection();
  return connection;
}
