import { ITodo } from "./todo.interface";

export interface IPaginationOption {
  currentPage: number;
  totalPages: number;
  offset: number;
  limit: number;
  limitOptions: number[];
  size: number;
}

export interface IPaginationProps {
  todos: ITodo[];
  currentTodosAmount: number;
}
