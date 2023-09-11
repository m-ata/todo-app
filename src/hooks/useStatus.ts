import { STATUS } from '@/enum/status.enum';
import { ITodo } from '@interfaces/todo.interface';
import { useMemo } from 'react';

/**
 * Custom hook to determine the status of a TODO item based on its properties.
 * @param {ITodo} props - The props containing the TODO item.
 * @returns {Status} The status of the TODO item.
 */
export const useStatus = (todo: ITodo): string => {
  const status = useMemo(() => {
    if (todo?.isCompleted) {
      return STATUS.COMPLETED;
    } else if (todo?.deadline < new Date(+Date.now()).toISOString()) {
      // check todo deadline is less than current timestamp
      return STATUS.OVERDUE;
    } else {
      return STATUS.PENDING;
    }
  }, [todo]);

  return status;
};
