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
  deadline: 0,
  isCompleted: false,
};

export const TODO_COLUMNS = ['Task', 'Deadline', 'Status', 'Actions'];

export const COMPLETE_TODO_CONFIRMATION_HEADING = 'Complete Task';
export const COMPLETE_TODO_CONFIRMATION_CONTENT =
  'Are you sure, this task is completed?';

export const DELETE_TODO_CONFIRMATION_HEADING = 'Delete Task';
export const DELETE_TODO_CONFIRMATION_CONTENT =
  'Are you sure, you want to delete this task?';

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
  COMPLETED: 'Marked as completed'
};
