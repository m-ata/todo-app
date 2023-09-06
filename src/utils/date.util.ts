/**
 * Parses a date string to a timestamp.
 * @param {string} date - The date string to parse.
 * @returns {number | null} The timestamp representing the parsed date or null if parsing fails.
 */
export const parseDateToTimestamp = (date: string): number => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : Date.now();
};

/**
 * Parses a timestamp into a formatted date string.
 * @param {number} timeStamp - The timestamp to parse.
 * @returns {string} The formatted date string in the format "dd.MM.yyyy".
 */
export const parseDateStringFormat = (timeStamp: number): string => {
  const [year, month, day] = new Date(+timeStamp)
    .toISOString()
    .split('T')[0]
    .split('-');
  return `${day}.${month}.${year}`;
};
