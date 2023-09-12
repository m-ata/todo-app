export const APP_ROUTES = {
  home: '/',
  todo: '/todo',
  notFound: '/404',
};

export const DEFAULT_PAGINATION_OPTIONS = {
  currentPage: 1,
  totalPages: 1,
  offset: 0,
  limit: 10,
  limitOptions: [10, 25, 50, 100],
  size: 0,
};

export const DEFAULT_TODO = {
  id: 0,
  task: '',
  deadline: '',
  isCompleted: false,
};

export const TODO_COLUMNS = ['Task', 'Deadline', 'Status', 'Actions'];

export const INVALID_DATE = 'Invalid Date';

export const ERROR_MESSAGES = {
  NOT_FOUND: 'Resource not found.',
  INTERNAL_ERROR: 'Internal Server Error',
  BAD_REQUEST: 'Bad Request',
  UNKNOWN: 'Unknown Error',
  SOMETHING_WRONG: 'Something went wrong',
};

export const SUCCESS_MESSAGES = {
  SAVED: 'Saved successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  COMPLETED: 'Marked as completed',
};

export const TOAST_AUTO_CLOSE = {
  SUCCESS: 1000,
  ERROR: 3000,
};
