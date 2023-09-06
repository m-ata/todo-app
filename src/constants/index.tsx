export const APP_ROUTES = {
  home: "/",
  todo: "/todo",
  notFound: "/404",
};

export const DEFAULT_PAGINATION_OPTIONS = {
  currentPage: 1,
  totalPages: 1,
  offset: 0,
  limit: 10,
  limitOptions: [10, 25, 50, 100],
  size: 0,
};

export const TODO_COLUMNS = ['Task', 'Deadline', 'Status', 'Actions'];
