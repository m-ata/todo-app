import { ERROR_MESSAGES } from '@/constants';
import { HTTP_STATUS_CODES } from '@/enum/status.enum';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

/**
 * Function to get a user-friendly error message from a FetchBaseQueryError
 * @param {FetchBaseQueryError} serverError - The server error.
 * @returns {string} error message based on the status.
 */
export const getApiError = (serverError: FetchBaseQueryError): string => {
  const { NOT_FOUND, INTERNAL_ERROR, BAD_REQUEST, UNKNOWN } = ERROR_MESSAGES;
  const { status } = serverError;
  switch (status) {
    case HTTP_STATUS_CODES.NOT_FOUND:
      return NOT_FOUND;
    case HTTP_STATUS_CODES.BAD_REQUEST:
      return BAD_REQUEST;
    case HTTP_STATUS_CODES.INTERNAL_ERROR:
      return INTERNAL_ERROR;
    default:
      return typeof serverError.status === 'string'
        ? serverError.error
        : UNKNOWN;
  }
};
