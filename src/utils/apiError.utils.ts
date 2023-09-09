import { ERROR_MESSAGES } from '@/constants';
import { HTTP_STATUS_CODES } from '@/enum/status.enum';

export const getApiError = (status: number) => {
  let error = '';
  const { NOT_FOUND, INTERNAL_ERROR, BAD_REQUEST, UNKNOWN } = ERROR_MESSAGES;

  switch (status) {
    case HTTP_STATUS_CODES.NOT_FOUND:
      error = NOT_FOUND;
      break;
    case HTTP_STATUS_CODES.BAD_REQUEST:
      error = BAD_REQUEST;
      break;
    case HTTP_STATUS_CODES.INTERNAL_ERROR:
      error = INTERNAL_ERROR;
      break;
    default:
      error = UNKNOWN;
      break;
  }
  return error;
};
