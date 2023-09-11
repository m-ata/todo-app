import { INVALID_DATE } from '@/constants';

const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
/**
 * Parses a date string to a timestamp.
 * @param {string} isoDateString - The ISO Date String to parse.
 * @returns {string} The string representing the parsed date with day end into ISOString format.
 */
export const parseISODateToDayEnd = (isoDateString: string): string => {
  const parsedDate = new Date(isoDateString);
  parsedDate.setUTCHours(23, 59, 59, 999); // setting day end time
  return isoDatePattern.test(isoDateString)
    ? parsedDate.toISOString()
    : new Date(+Date.now()).toISOString();
};

/**
 * Parses a ISO Date into a formatted date string.
 * @param {string} isoString - The ISO Date String to parse.
 * @returns {string} The formatted date string in the format "dd.MM.yyyy".
 */
export const parseISODateToStringFormat = (isoDateString: string): string => {
  if (!isoDatePattern.test(isoDateString)) return INVALID_DATE;
  const [year, month, day] = new Date(isoDateString)
    .toISOString()
    .split('T')[0]
    .split('-');
  return `${day}.${month}.${year}`;
};
