import { FC } from 'react';
import { IEditTodoProps, ITodo } from '@interfaces/todo.interface';
import { useDispatch } from 'react-redux';
import { updateTodo } from '@redux/slices/todo.slice';
import FormsModal from '@components/FormsModal';
import { IFormInputs } from '@/interfaces/modal.interface';
import { SubmitHandler } from 'react-hook-form';
import { parseDateToTimestamp } from '@utils/date.util';

const EditTodo: FC<IEditTodoProps> = ({ onClose, todo }: IEditTodoProps) => {
  const dispatch = useDispatch();

  const defaultFormValues: IFormInputs = {
    task: todo.task,
    deadline: new Date(+todo.deadline).toISOString().split('T')[0],
  };

  const submitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    const { task, deadline } = data;
    const editedTodo: ITodo = {
      ...todo,
      task,
      deadline: parseDateToTimestamp(deadline),
    };
    dispatch(updateTodo(editedTodo));
    onClose();
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
