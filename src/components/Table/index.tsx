import { FC } from 'react';
import { ITodo, ITableProps } from '@/interfaces/todo.interface';
import deleteIcon from '/icons/delete.svg';
import editIcon from '/icons/edit.svg';
import checkIcon from '/icons/check.svg';
import './styles.scss';
import { parseDateStringFormat } from '@/utils/date.util';
import { getStatus } from '@/utils/status.util';
import EmptyData from '@components/EmptyData';
import { UPSERT_TODO_TYPE } from '@/enum/upsert-todo.enum';

const Table: FC<ITableProps> = ({
  columns,
  data,
  handleUpsert,
}: ITableProps) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column: string, index: number) => (
              <th key={`column-${index + 1}`}> {column} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: ITodo) => (
            <tr key={item.id}>
              <td>{item.task}</td>
              <td>{parseDateStringFormat(item.deadline || 0)}</td>
              <td>
                {' '}
                <span className={`status ${getStatus(item)}`}>
                  {' '}
                  {getStatus(item)}{' '}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className={`icon-btn delete`}
                  onClick={() => handleUpsert(item, UPSERT_TODO_TYPE.DELETE)}
                >
                  <img src={deleteIcon} alt={'delete-icon'} />
                </button>
                <button disabled={item.isCompleted} type="button" className={`icon-btn edit`}>
                  <img src={editIcon} alt={'edit-icon'} />
                </button>
                <button
                  type="button"
                  disabled={item.isCompleted}
                  className={`icon-btn check`}
                  onClick={() => handleUpsert(item, UPSERT_TODO_TYPE.COMPLETE)}
                >
                  <img src={checkIcon} alt={'check-icon'} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <EmptyData />}
    </>
  );
};

export default Table;
