/**
 * Parses a date string to a timestamp.
 * @param {string} date - The date string to parse.
 * @returns {number | null} The timestamp representing the parsed date or null if parsing fails.
 */
export const parseDateToTimestamp = (date: string): number | null => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : null;
};
