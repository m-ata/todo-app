import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
// import interfaces
import {
  IAddTodoProps,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
import { IFormInputs } from '@interfaces/modal.interface';
// import component
import FormsModal from '@components/FormsModal';
// import utils
import { parseDateToTimestamp } from '@utils/date.util';
import { getApiError } from '@/utils/apiError.util';
// redux related imports
import { useAddTodoMutation } from '@redux/services/todo.service';
import { addTodo } from '@redux/slices/todo.slice';
// import constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { ADD_TODO } from '@/constants/label.constants';

const AddTodo: FC<IAddTodoProps> = ({ onClose }: IAddTodoProps) => {
  const dispatch = useDispatch();
  const [addTodoMutation] = useAddTodoMutation();

  // default value for add todo form
  const defaultFormValues: IFormInputs = {
    task: '',
    deadline: new Date(+Date.now()).toISOString().split('T')[0],
  };

  // form submit handler
  const submitHandler: SubmitHandler<IFormInputs> = async (
    formData: IFormInputs,
  ) => {
    try {
      const { task, deadline } = formData;
      const newTodo: ITodo = {
        task,
        deadline: parseDateToTimestamp(deadline),
        isCompleted: false,
      };
      const { data, error } = (await addTodoMutation(
        newTodo,
      )) as RTKQueryResponse; // call api using RTK addTodoMutation
      if (data) {
        dispatch(addTodo(data as ITodo)); // dispatch the response
        toast.success(SUCCESS_MESSAGES.SAVED);
        onClose();
      }
      if (error) toast.error(getApiError(error));
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  };

  return (
    <FormsModal
      heading={ADD_TODO}
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
    />
  );
};

export default AddTodo;
