import type { Connection } from '../connection';
import { type Migration } from './types';

export default function (connection: Connection): Migration {
  return {
    name: 'initial migration',
    async up() {},
    async down() {},
  };
}
