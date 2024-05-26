import * as path from 'path';

export const appStorage = path.join(
  process.env.APPDATA ||
    (process.platform == 'darwin'
      ? process.env.HOME + '/Library/Preferences'
      : process.env.HOME + '/.local/share'),
  'Dailies Tracker'
);
