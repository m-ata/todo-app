import { FC, FormEvent, useCallback, useRef } from 'react';
import './styles.scss';
import Button from '../Button';
import { IAddTodoProps, ITodo } from '@interfaces/todo.interface';
import { useDispatch } from 'react-redux';
import { addTodo } from '@redux/slices/todo.slice';
import { parseDateToTimestamp } from '@utils/date.util';

const AddTodo: FC<IAddTodoProps> = ({ onClose }: IAddTodoProps) => {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const deadlineInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ITodo = {
        id: Math.random().toString(36).substr(2, 9),
        task: taskInputRef.current?.value || '',
        deadline: parseDateToTimestamp(deadlineInputRef.current?.value || ''),
        isCompleted: false,
      };
      dispatch(addTodo(data));
      onClose();
    },
    [onClose, dispatch],
  );

  return (
    <>
      <section className="modal">
        <div className="header">
          <h2 className='heading'> Add Todo </h2>
          <button className="btn-close" onClick={onClose}>
            ⨉
          </button>
        </div>
        <hr />
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Task:</label>
            <input
              id="test"
              ref={taskInputRef}
              type="text"
              placeholder="Write a task"
            />
          </div>
          <div className="input-group">
            <label>Deadline:</label>
            <input
              id="test2"
              ref={deadlineInputRef}
              type="date"
              placeholder="Select deadline"
            />
          </div>
          <hr />
          <div className="actions">
            <Button
              label="Cancel"
              onClick={onClose}
              category="secondary"
              type="button"
            />
            <Button
              label="Save"
              onClick={() => console.log('save')}
              type="submit"
            />
          </div>
        </form>
      </section>
      <div className="overlay" />
    </>
  );
};

export default AddTodo;
