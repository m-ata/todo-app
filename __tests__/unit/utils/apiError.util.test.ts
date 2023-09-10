import { getApiError } from '../../../src/utils/apiError.util'; // Replace with the correct path to your utility function
import { ERROR_MESSAGES } from '../../../src/constants';
import { HTTP_STATUS_CODES } from '../../../src/enum/status.enum';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

describe('getApiError', () => {
  const { NOT_FOUND, INTERNAL_ERROR, BAD_REQUEST } = ERROR_MESSAGES;

  it('should return NOT_FOUND message for 404 status', () => {
    const serverError = {
      status: HTTP_STATUS_CODES.NOT_FOUND,
    } as FetchBaseQueryError;
    // resource not found
    const errorMessage = getApiError(serverError);
    expect(errorMessage).toBe(NOT_FOUND);
  });

  it('should return BAD_REQUEST message for 400 status', () => {
    const serverError = {
      status: HTTP_STATUS_CODES.BAD_REQUEST,
    } as FetchBaseQueryError;
    // bad request
    const errorMessage = getApiError(serverError);
    expect(errorMessage).toBe(BAD_REQUEST);
  });

  it('should return INTERNAL_ERROR message for 500 status', () => {
    const serverError = {
      status: HTTP_STATUS_CODES.INTERNAL_ERROR,
    } as FetchBaseQueryError;
    // internal server error
    const errorMessage = getApiError(serverError);
    expect(errorMessage).toBe(INTERNAL_ERROR);
  });

  it('should return the error message when status is a string', () => {
    const serverError = {
      status: 'FETCH_ERROR', 
      error: 'TypeError: Failed to fetch',
    } as FetchBaseQueryError;
    // failed to fetch the request
    const errorMessage = getApiError(serverError);
    expect(errorMessage).toBe('TypeError: Failed to fetch');
  });
});
