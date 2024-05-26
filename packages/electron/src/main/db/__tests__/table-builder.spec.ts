import { describe, test, expect } from 'vitest';
import { column, createBaseSchema, table } from '../table-builder';

describe('table-builder', () => {
  test('should properly define a new table schema', () => {
    expect(() => {
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
      const BaseSchema = createBaseSchema({
        id: column.id(),
        createdAt: column.date().default('datetime("now")'),
        updatedAt: column.date().nullable(),
        deletedAt: column.date().nullable(),
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
      table('test_table', {
        name: 'text' as any,
      });
    }).toThrow();
  });

  test('should throw an error when trying to define a base schema with a non-column definition', () => {
    expect(() => {
      createBaseSchema({
        id: 'id' as any,
      });
    }).toThrow();
  });

  test('should properly parse a table schema', () => {
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    })
      .mapsTo((entity) => ({
        firstName: entity.name.split(' ')[0],
        lastName: entity.name.split(' ')[1],
        age: entity.age,
      }))
      .seal();

    const parsed = TestTable.parse({
      name: 'John Doe',
      age: 30,
    });

    expect(parsed).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    });
  });

  test('should return the field name when the column name is not defined', () => {
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    });

    expect(TestTable.schema.name.columnName).toBe('name');
  });

  test('should return the column name when the column name is defined', () => {
    const TestTable = table('test_table', {
      name: column.text('full_name'),
      age: column.int(),
    });

    expect(TestTable.schema.name.columnName).toBe('full_name');
  });
});
