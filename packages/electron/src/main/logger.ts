import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import * as dateFns from 'date-fns';
import { appStorage } from './consts';

type LoggerEventMap = {
  log: any[];
  warn: any[];
  error: any[];
  info: any[];
  debug: any[];
};

export type LoggerInit = {
  redirectToFile?: boolean;
  includeEvents?: (keyof LoggerEventMap)[] | 'all';
};

const formatArgumentToLoggable = (arg: any) => {
  if (arg instanceof Error) {
    return `${arg.name}: ${arg.message}\n${arg.stack}`;
  }
  if (typeof arg === 'object') {
    if (Array.isArray(arg)) {
      return arg.map((item) => formatArgumentToLoggable(item)).join(', ');
    }
    return JSON.stringify(arg, null, 2);
  }
  return arg;
};

const createLogMessage = (type: keyof LoggerEventMap, ...args: any[]) =>
  `${new Date().toLocaleTimeString()} [${type.toUpperCase()}] ${args
    .map(formatArgumentToLoggable)
    .join(' ')}\n`;

const logsDir = path.join(appStorage, 'logs');

export function setupLogger(
  init: LoggerInit = { includeEvents: ['log', 'info', 'error'] }
): () => Promise<void> {
  let logFileStream: fs.WriteStream | null = null;
  const log = console.log.bind(console);
  const warn = console.warn.bind(console);
  const error = console.error.bind(console);
  const info = console.info.bind(console);
  const debug = console.log.bind(console);

  const loggerEventEmitter = new EventEmitter<LoggerEventMap>();

  if (init.redirectToFile) {
    const filename = `${dateFns.format(new Date(), 'yyyy-MM-dd_HH-mm')}.txt`;
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    } else if (fs.readdirSync(logsDir).length > 15) {
      fs.readdirSync(logsDir)
        .sort()
        .slice(0, -15)
        .forEach((file) => {
          fs.rmSync(path.join(logsDir, file));
        });
    }
    logFileStream = fs.createWriteStream(
      path.join(appStorage, 'logs', filename),
      {
        flags: 'a',
      }
    );
    loggerEventEmitter.addListener('log', (...args) => {
      logFileStream?.write(createLogMessage('log', ...args));
    });
    loggerEventEmitter.addListener('warn', (...args) => {
      logFileStream?.write(createLogMessage('warn', ...args));
    });
    loggerEventEmitter.addListener('error', (...args) => {
      logFileStream?.write(createLogMessage('error', ...args));
    });
    loggerEventEmitter.addListener('info', (...args) => {
      logFileStream?.write(createLogMessage('info', ...args));
    });
  }

  console.log = (...args: any[]) => {
    log(createLogMessage('log', ...args));
    if (init.includeEvents === 'all' || init.includeEvents?.includes('log')) {
      loggerEventEmitter.emit('log', ...args);
    }
  };
  console.warn = (...args: any[]) => {
    warn(createLogMessage('warn', ...args));
    if (init.includeEvents === 'all' || init.includeEvents?.includes('warn')) {
      loggerEventEmitter.emit('warn', ...args);
    }
  };
  console.error = (...args: any[]) => {
    error(createLogMessage('error', ...args));
    if (init.includeEvents === 'all' || init.includeEvents?.includes('error')) {
      loggerEventEmitter.emit('error', ...args);
    }
  };
  console.info = (...args: any[]) => {
    info(createLogMessage('info', ...args));
    if (init.includeEvents === 'all' || init.includeEvents?.includes('info')) {
      loggerEventEmitter.emit('info', ...args);
    }
  };
  console.debug = (...args: any[]) => {
    debug(createLogMessage('debug', ...args));
    if (init.includeEvents === 'all' || init.includeEvents?.includes('debug')) {
      loggerEventEmitter.emit('debug', ...args);
    }
  };

  console.log('Logger initialized with', init);

  return () =>
    new Promise((resolve) => {
      logFileStream?.end('Closing logger', () => {
        resolve();
      });
    });
}
