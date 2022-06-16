export const ELITE_DIR_REL =
  './Saved Games/Frontier Developments/Elite Dangerous';

export const ELITE_JOURNAL_RE = /Journal\.(.+)\.log/g;

export const isSameDay = (d1: Date, d2: Date) =>
  d1.getUTCFullYear == d2.getUTCFullYear &&
  d1.getUTCMonth == d2.getUTCMonth &&
  d1.getUTCDay == d2.getUTCDay;
