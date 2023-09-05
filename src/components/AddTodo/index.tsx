import { FC, FormEvent, useCallback, useRef } from 'react';
import './styles.scss';
import Button from '../Button';
import { IAddTodoProps } from '@interfaces/addTodo.interface';

const AddTodo: FC<IAddTodoProps> = ({ onClose }: IAddTodoProps) => {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const deadlineInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      task: taskInputRef.current?.value,
      deadline: deadlineInputRef.current?.value,
    };
    console.log(data);
    // add the data to the redux store later
    onClose();
  }, [onClose]);

  return (
    <>
      <section className="modal">
        <div className="header">
          <h2> Add Todo </h2>
          <button className="btn-close" onClick={() => console.log('Close')}>
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
