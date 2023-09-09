import { FC } from 'react';
import {
  IEditTodoProps,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
import { useDispatch } from 'react-redux';
import { updateTodo } from '@redux/slices/todo.slice';
import FormsModal from '@components/FormsModal';
import { IFormInputs } from '@/interfaces/modal.interface';
import { SubmitHandler } from 'react-hook-form';
import { parseDateToTimestamp } from '@utils/date.util';
import { useUpdateTodoMutation } from '@/redux/services/todo.service';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { getApiError } from '@/utils/apiError.utils';

const EditTodo: FC<IEditTodoProps> = ({ onClose, todo }: IEditTodoProps) => {
  const dispatch = useDispatch();
  const [updateTodoMutation] = useUpdateTodoMutation();
  const defaultFormValues: IFormInputs = {
    task: todo.task,
    deadline: new Date(+todo.deadline).toISOString().split('T')[0],
  };

  const submitHandler: SubmitHandler<IFormInputs> = async (
    formData: IFormInputs,
  ) => {
    try {
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
        toast.success(SUCCESS_MESSAGES.UPDATED);
        onClose();
      }
      if (error) toast.error(getApiError(error.status as number));
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  };

  return (
    <FormsModal
      heading="Edit Todo"
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
    />
  );
};

export default EditTodo;
