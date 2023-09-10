// imports from react
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
// import component
import FormsModal from '@components/FormsModal';
// redux related imports
import { updateTodo } from '@redux/slices/todo.slice';
import { useUpdateTodoMutation } from '@redux/services/todo.service';
// import required interfaces
import {
  IEditTodoProps,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
import { IFormInputs } from '@interfaces/modal.interface';
// import required utils
import { parseDateToTimestamp } from '@utils/date.util';
import { getApiError } from '@/utils/apiError.util';
// import constants
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_AUTO_CLOSE,
} from '@/constants';
import { EDIT_TODO } from '@/constants/label.constants';

const EditTodo: FC<IEditTodoProps> = ({ onClose, todo }: IEditTodoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [updateTodoMutation] = useUpdateTodoMutation();

  // default values for edit todo form
  const defaultFormValues: IFormInputs = {
    task: todo.task,
    deadline: new Date(+todo.deadline).toISOString().split('T')[0],
  };

  // submit handler for edit todo form
  const submitHandler: SubmitHandler<IFormInputs> = async (
    formData: IFormInputs,
  ) => {
    try {
      setIsLoading(true);
      const { task, deadline } = formData;
      const updatedTodo: ITodo = {
        ...todo,
        task,
        deadline: parseDateToTimestamp(deadline),
      };
      const { data, error } = (await updateTodoMutation(
        updatedTodo,
      )) as RTKQueryResponse;
      if (data) {
        dispatch(updateTodo(data as ITodo)); // update todo in store
        toast.success(SUCCESS_MESSAGES.UPDATED, {
          autoClose: TOAST_AUTO_CLOSE.SUCCESS,
        });
        onClose();
      }
      if (error)
        toast.error(getApiError(error), {
          autoClose: TOAST_AUTO_CLOSE.ERROR,
        });
      setIsLoading(false);
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG, {
        autoClose: TOAST_AUTO_CLOSE.ERROR,
      });
      setIsLoading(false);
    }
  };

  return (
    <FormsModal
      heading={EDIT_TODO}
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
      isFormSubmitting={isLoading}
    />
  );
};

export default EditTodo;
