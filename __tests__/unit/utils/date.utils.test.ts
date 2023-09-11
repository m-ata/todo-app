import { parseISODateToDayEnd, parseISODateToStringFormat } from '../../../src/utils/date.util';
import { INVALID_DATE } from '../../../src/constants';

describe('parseISODateToDayEnd', () => {
  it('parses an ISO date string to the end of the day in ISO format', () => {
    const isoDateString = '2023-09-11T12:34:56.789Z';
    const result = parseISODateToDayEnd(isoDateString);

    expect(result).toMatch(/^2023-09-11T23:59:59.999Z$/);
  });

  it('returns the current date in ISO format for an invalid input', () => {
    const invalidDateString = 'invalid-date';
    const result = parseISODateToDayEnd(invalidDateString);

    expect(result).toBe(new Date(+Date.now()).toISOString());
  });
});

describe('parseISODateToStringFormat', () => {
  it('parses an ISO date string to a formatted date string', () => {
    const isoDateString = '2023-09-11T12:34:56.789Z';
    const result = parseISODateToStringFormat(isoDateString);

    expect(result).toBe('11.09.2023');
  });

  it('returns an invalid date message for an invalid input', () => {
    const invalidDateString = 'invalid-date';
    const result = parseISODateToStringFormat(invalidDateString);

    expect(result).toBe(INVALID_DATE);
  });
});
