import { test, describe, expect } from 'vitest';
import * as utils from '../utils';
import { connect } from '../connection';

const { table, column } = connect();

describe('db utils', () => {
  test('should parameterize a script properly', () => {
    const TestTable = table('test', {
      name: column.text(),
      age: column.int(),
    });
    const [
      script,
      args,
    ] = utils.parameterizeScript`SELECT * FROM ${TestTable} WHERE ${
      TestTable.name
    } = ${'test'}`;
    expect(script).toEqual('SELECT * FROM test WHERE name = ?');
    expect(args).toEqual(['test']);
  });
});
