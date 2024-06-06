import * as sqlite3 from 'sqlite3';
import {
  BaseColumn,
  TextColumn,
  IntColumn,
  BooleanColumn,
  RealColumn,
  BlobColumn,
  DateColumn,
  IdColumn,
  CreatedAtColumn,
  UpdatedAtColumn,
  DeletedAtColumn,
} from './columns';
import { TableSchema, BaseSchema } from './table';

export class DatabaseFactory {
  constructor(private _db: sqlite3.Database) {}

  base = <T extends Record<string, BaseColumn>>(columns: T) => {
    return new BaseSchema(columns);
  };

  table = <T extends Record<string, BaseColumn>, TName extends string = string>(
    name: TName,
    columns: T
  ) => {
    return new TableSchema(name, columns, this._db);
  };

  column = {
    text<TName extends string>(name?: TName): TextColumn<TName> {
      return new TextColumn(name);
    },
    int<TName extends string>(name?: TName): IntColumn<TName> {
      return new IntColumn(name);
    },
    boolean<TName extends string>(name?: TName): BooleanColumn<TName> {
      return new BooleanColumn(name);
    },
    real<TName extends string>(name?: TName): RealColumn<TName> {
      return new RealColumn(name);
    },
    blob<TName extends string>(name?: TName): BlobColumn<TName> {
      return new BlobColumn(name);
    },
    date<TName extends string>(name?: TName): DateColumn<TName> {
      return new DateColumn(name);
    },
    id(): IdColumn {
      return new IdColumn();
    },
    createdAt(): CreatedAtColumn {
      return new CreatedAtColumn();
    },
    updatedAt(): UpdatedAtColumn {
      return new UpdatedAtColumn();
    },
    deletedAt(): DeletedAtColumn {
      return new DeletedAtColumn();
    },
  };
}

export function initializeDatabase(db: sqlite3.Database): DatabaseFactory {
  return new DatabaseFactory(db);
}
