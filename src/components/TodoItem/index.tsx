import { UPSERT_TODO_TYPE } from '@/enum/upsert-todo.enum';
import { ITodoItem } from '@interfaces/todo.interface';
import deleteIcon from '/icons/delete.svg';
import editIcon from '/icons/edit.svg';
import checkIcon from '/icons/check.svg';
import { FC, memo } from 'react';
import { parseDateStringFormat } from '@/utils/date.util';
import './styles.scss';
import { useStatus } from '@hooks/useStatus';

const TodoItem: FC<ITodoItem> = memo(
  ({ todo, isMobile, handleUpsert }: ITodoItem) => {
    const status = useStatus(todo);

    // method responsible to render a table row
    const renderTableRow = () => {
      return (
        <tr key={todo.id}>
          <td>{todo.task}</td>
          <td>{parseDateStringFormat(todo.deadline || 0)}</td>
          <td>
            {' '}
            <span className={`status ${status}`}> {status} </span>
          </td>
          <td>
            <button
              type="button"
              className={`icon-btn delete`}
              onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.DELETE)}
            >
              <img src={deleteIcon} alt={'delete-icon'} />
            </button>
            <button
              disabled={todo.isCompleted}
              type="button"
              className={`icon-btn edit`}
              onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.EDIT)}
            >
              <img src={editIcon} alt={'edit-icon'} />
            </button>
            <button
              type="button"
              disabled={todo.isCompleted}
              className={`icon-btn check`}
              onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.COMPLETE)}
            >
              <img src={checkIcon} alt={'check-icon'} />
            </button>
          </td>
        </tr>
      );
    };

    // method responsible to render card
    const renderCard = () => {
      return (
        <div className="card" key={todo.id}>
          <header>
            <div className={`status ${status}`}>{status}</div>
            <div className="actions">
              <button
                type="button"
                className="icon-btn delete"
                onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.DELETE)}
              >
                <img src={deleteIcon} alt="delete-icon" />
              </button>
              <button
                type="button"
                disabled={todo.isCompleted}
                className="icon-btn edit"
                onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.EDIT)}
              >
                <img src={editIcon} alt="edit-icon" />
              </button>
              <button
                type="button"
                disabled={todo.isCompleted}
                className="icon-btn check"
                onClick={() => handleUpsert(todo, UPSERT_TODO_TYPE.COMPLETE)}
              >
                <img src={checkIcon} alt="check-icon" />
              </button>
            </div>
          </header>
          <div className="card-data">
            <div className="group">
              <h5>Task</h5>
              <span>{todo.task}</span>
            </div>
            <hr />
            <div className="group">
              <h5>Deadline</h5>
              <span>{parseDateStringFormat(todo.deadline)}</span>
            </div>
          </div>
        </div>
      );
    };

    return isMobile ? renderCard() : renderTableRow();
  },
);

export default TodoItem;
