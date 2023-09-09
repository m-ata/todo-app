import { FC } from 'react';
import {
  IAddTodoProps,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
import { useDispatch } from 'react-redux';
import { addTodo } from '@redux/slices/todo.slice';
import FormsModal from '@components/FormsModal';
import { IFormInputs } from '@/interfaces/modal.interface';
import { SubmitHandler } from 'react-hook-form';
import { parseDateToTimestamp } from '@utils/date.util';
import { useAddTodoMutation } from '@/redux/services/todo.service';

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
        onClose();
      }
      if (error) throw new Error();
    } catch (err) {
      // will handle error later
    }
  };

  return (
    <FormsModal
      heading="Add Todo"
      formValues={defaultFormValues}
      onClose={onClose}
      onSubmit={submitHandler}
    />
  );
};

export default AddTodo;
