import { describe, test, expect, vi } from 'vitest';
import { ColumnValidationError } from '../columns';
import { connect } from '../connection';

const setupMockDb = () => {
  const result = connect();
  result.initializeConnection(':memory:');
  return result;
};

describe('table-builder', () => {
  test('should properly define a new table schema', () => {
    expect(() => {
      const { table, column } = setupMockDb();
      const TestTable = table('test_table', {
        name: column.text(),
        age: column.int(),
      });

      expect(TestTable).toBeDefined();
      expect(TestTable._schema.name).toBeDefined();
      expect(TestTable._schema.age).toBeDefined();
    }).not.toThrow();
  });

  test('should throw an error when trying to define a table schema with a non-column definition', () => {
    expect(() => {
      const { table } = setupMockDb();
      table('test_table', {
        name: 'text' as any,
      });
    }).toThrow();
  });

  test('should properly parse data', () => {
    const { table, column } = setupMockDb();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    });

    const parsed = TestTable.parse({
      id: 1,
      name: 'John Doe',
      age: 30,
    });

    expect(parsed.name).toBe('John Doe');
    expect(parsed.age).toBe(30);
    expect(parsed.id).toBe(1);
  });

  test('should return the field name when the column name is not defined', () => {
    const { table, column } = setupMockDb();
    const TestTable = table('test_table', {
      name: column.text(),
      age: column.int(),
    });

    expect(TestTable._schema.name._columnName).toBe('name');
  });

  test('should return the column name when the column name is defined', () => {
    const { table, column } = setupMockDb();
    const TestTable = table('test_table', {
      name: column.text('full_name'),
      age: column.int(),
    });

    expect(TestTable._schema.name._columnName).toBe('full_name');
  });

  test('should not allow null on non-nullable columns', () => {
    expect(() => {
      const { table, column } = setupMockDb();
      const TestTable = table('test_table', {
        name: column.text(),
      });
      TestTable.parse({
        name: null,
      });
    }).toThrow(/value cannot be null/i);
  });

  test('should allow null on nullable columns', () => {
    expect(() => {
      const { table, column } = setupMockDb();
      const TestTable = table('test_table', {
        name: column.text().nullable(),
      });
      TestTable.parse({
        name: null,
      });
    }).not.toThrow(/value cannot be null/i);
  });
});
