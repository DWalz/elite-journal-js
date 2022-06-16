import EliteWatcher, { EliteJournalWatchOptions } from './watcher';

export default function (options?: EliteJournalWatchOptions) {
  return new EliteWatcher(options);
}

export { EliteWatcher };

export * as events from './journal-events';
export * as eventOptions from './journal-event-types';
export * as constants from './constants';
