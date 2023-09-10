import { FC } from 'react';
// import interfaces
import { ITodo, ITableProps } from '@interfaces/todo.interface';
// import components
import EmptyData from '@components/EmptyData';
import TodoItem from '@components/TodoItem';

import './styles.scss';

// Table component that displays a table of todos.
const Table: FC<ITableProps> = ({
  columns,
  data,
  isMobile,
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
          {/* Map over the todo data and render a TodoItem component for each todo. */}
          {data.map((item: ITodo) => (
            <TodoItem
              key={item.id}
              todo={item}
              isMobile={isMobile}
              handleUpsert={handleUpsert}
            />
          ))}
        </tbody>
      </table>
      {/* Display EmptyData component if there is no todos in the data */}
      {!data.length && <EmptyData />}
    </>
  );
};

export default Table;
