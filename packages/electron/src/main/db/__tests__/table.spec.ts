import { describe, test, expect, vi } from 'vitest';
import * as sqlite3 from 'sqlite3';
import { initializeDatabase } from '../factory';
import { ColumnValidationError } from '../columns';

const initializeInMemoryDatabase = () => {
  const inMemoryDb = new sqlite3.Database(':memory:');
  return initializeDatabase(inMemoryDb);
};

describe('table-builder', () => {
  test('should properly define a new table schema', () => {
    expect(() => {
      const { table, column } = initializeInMemoryDatabase();
      const TestTable = table('test_table', {
        name: column.text(),
        age: column.int(),
      });

      expect(TestTable).toBeDefined();
      expect(TestTable.schema.name).toBeDefined();
      expect(TestTable.schema.age).toBeDefined();
    }).not.toThrow();
  });

  test('should properly define a new table schema with a base schema', () => {
    expect(() => {
      const { table, column, base } = initializeInMemoryDatabase();
      const BaseSchema = base({
        id: column.id(),
        createdAt: column.createdAt(),
        updatedAt: column.updatedAt(),
        deletedAt: column.deletedAt(),
      });

      const UserTable = table('user_table', {
        username: column.text(),
      }).extends(BaseSchema);

      expect(UserTable).toBeDefined();
      expect(UserTable.schema.id).toBeDefined();
      expect(UserTable.schema.createdAt).toBeDefined();
      expect(UserTable.schema.updatedAt).toBeDefined();
      expect(UserTable.schema.deletedAt).toBeDefined();
      expect(UserTable.schema.username).toBeDefined();
    }).not.toThrow();
  });

  test('should throw an error when trying to define a table schema with a non-column definition', () => {
    expect(() => {
      const { table } = initializeInMemoryDatabase();
      table('test_table', {
        name: 'text' as any,
      });
    }).toThrow();
  });

  test('should throw an error when trying to define a base schema with a non-column definition', () => {
    expect(() => {
      const { base } = initializeInMemoryDatabase();
      base({
        id: 'id' as any,
      });
    }).toThrow();
  });

  test('should properly parse data', () => {
    const { table, column } = initializeInMemoryDatabase();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    }).entity();

    const [parsed] = TestTable.parse({
      name: 'John Doe',
      age: 30,
    });

    expect(parsed).toEqual({
      name: 'John Doe',
      age: 30,
    });
  });

  test('should properly map data with mapsTo', () => {
    const { table, column } = initializeInMemoryDatabase();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    })
      .mapsTo((entity) => ({
        firstName: entity.name.split(' ')[0],
        lastName: entity.name.split(' ')[1],
        age: entity.age,
      }))
      .entity();

    const [parsed] = TestTable.parse({
      name: 'John Doe',
      age: 30,
    });

    expect(parsed).toEqual({
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('should allow multiple mapsTo calls', () => {
    const { table, column } = initializeInMemoryDatabase();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    })
      .mapsTo((entity) => ({
        firstName: entity.name.split(' ')[0],
        lastName: entity.name.split(' ')[1],
        age: entity.age,
      }))
      .mapsTo((entity) => ({
        isOver18: entity.age > 18,
      }))
      .entity();

    const [parsed] = TestTable.parse({
      name: 'John Doe',
      age: 30,
    });
    expect(parsed).toEqual({
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      isOver18: true,
    });
  });

  test('should return the field name when the column name is not defined', () => {
    const { table, column } = initializeInMemoryDatabase();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    });

    expect(TestTable.schema.name.columnName).toBe('name');
  });

  test('should return the column name when the column name is defined', () => {
    const { table, column } = initializeInMemoryDatabase();
    const TestTable = table('test_table', {
      name: column.text('full_name'),
      age: column.int(),
    });

    expect(TestTable.schema.name.columnName).toBe('full_name');
  });

  test('should not allow null on non-nullable columns', () => {
    expect(() => {
      const { table, column } = initializeInMemoryDatabase();
      const TestTable = table('test_table', {
        name: column.text(),
      }).entity();
      TestTable.parse({
        name: null,
      });
    }).toThrowError(ColumnValidationError);
  });

  test('should allow null on nullable columns', () => {
    expect(() => {
      const { table, column } = initializeInMemoryDatabase();
      const TestTable = table('test_table', {
        id: column.id(),
        name: column.text().nullable(),
      }).entity();
      TestTable.parse({
        id: 1,
        name: null,
      });
    }).not.toThrowError(ColumnValidationError);
  });
});
