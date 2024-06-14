import { EventEmitter } from 'events';
import sqlite3 from 'sqlite3';
import * as columns from './columns';
import { Table } from './table';

type Enum = Record<string | symbol, string | number>;

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
  createdAt: new columns.DateColumn('created_at').default(() => new Date()),
  updatedAt: new columns.DateColumn('updated_at').nullable(),
  deletedAt: new columns.DateColumn('deleted_at').nullable(),
};

export interface Connection {
  initializeConnection(filename: string): void;
  execute(sql: string | TemplateStringsArray, ...values: any[]): Promise<any[]>;
  table<
    T extends Record<string, columns.Column<any, string, any>>,
    TName extends string = string
  >(
    name: TName,
    columns: T
  ): Table<typeof tableFields & T>;
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
  }

  initializeConnection = (filename: string) => {
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
    this._db.on('error', (err) => {
      this.emit('error', err);
    });
    this.on('ready', async () => {
      // setup tables
      const DbTable = this.table('db', {
        version: this.column.int(),
        columnName: this.column.text().oneOf(Object.keys(this._tables)),
      });
    });
    this.on('tablesInitialized', () => {
      // tables are setup, ready to go
    });
  };

  table = <
    T extends Record<string, columns.Column<any, string, any>>,
    TName extends string = string
  >(
    name: TName,
    columns: T
  ): Table<typeof tableFields & T> => {
    const table = new Table(
      name,
      {
        ...tableFields,
        ...columns,
      },
      this
    );
    this._tables.set(name, table);
    return table;
  };

  execute = (
    sql: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<any[]> => {
    // convert sql to sql script with params
    if (Array.isArray(sql)) {
      sql = sql.reduce((acc, str, i) => acc + str + '?', '');
    }
    console.log(sql);
    return this._queue.add(async () => {
      return new Promise((resolve, reject) => {
        this._db.all(sql as string satisfies string, values, (err, rows) => {
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

function parseSqlArgument(arg: any): string {
  if (arg instanceof Table) {
    return arg._name;
  } else if (arg instanceof columns.Column) {
    return arg._columnName;
  } else {
    return JSON.stringify(arg);
  }
}

export function connect(): Connection {
  const connection = new LazyConnection();

  return connection;
}
