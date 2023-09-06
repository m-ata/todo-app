import { STATUS } from "@/enum/status.enum";
import { ITodo } from "@/interfaces/todo.interface";

/**
 * Determines the status of a todo item
 * @param {ITodo} todo - todo item to evaluate.
 * @returns {string} - The status of the todo item (COMPLETED, OVERDUE, or PENDING).
 */
export const getStatus = (todo: ITodo): string => {
  // Current timestamp in milliseconds.
  const today = Date.now();

  // Check if todo item is completed.
  if (todo?.isCompleted) {
    return STATUS.COMPLETED;
  }

  // Check if todo item's deadline is overdue.
  if (todo?.deadline < today) {
    return STATUS.OVERDUE;
  }

  // If none of the above conditions are met, the status is pending.
  return STATUS.PENDING;
};
