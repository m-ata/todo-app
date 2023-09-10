import { parseDateToTimestamp, parseDateStringFormat } from '../../../src/utils/date.util';

describe('parseDateToTimestamp', () => {
  it('parses a valid date string to a timestamp', () => {
    const dateStr = '2023-09-15';
    const expectedTimestamp = new Date(dateStr + 'T23:59:59.999').getTime();
    const result = parseDateToTimestamp(dateStr);
    expect(result).toBe(expectedTimestamp);
  });

  it('returns the current timestamp for an invalid date string', () => {
    const invalidDateStr = 'invalid-date';
    const result = parseDateToTimestamp(invalidDateStr);
    expect(result).toBeCloseTo(Date.now(), -3); // nearly close to current timestamp
  });
});

describe('parseDateStringFormat', () => {
  it('parses a timestamp into a formatted date string', () => {
    const timestamp = 1758022400000; // September 16, 2025
    const expectedFormattedDate = '16.09.2025';
    const result = parseDateStringFormat(timestamp);
    expect(result).toBe(expectedFormattedDate);
  });
});
