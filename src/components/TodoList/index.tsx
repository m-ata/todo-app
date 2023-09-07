import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '@redux/reducers/rootReducer';
import Pagination from '../Pagination';
import Table from '@components/Table';
import Card from '@components/Card';
import { TODO_COLUMNS } from '@/constants';
import { ITodo } from '@/interfaces/todo.interface';

import './styles.scss';

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { paginationOptions } = useSelector(
    (state: RootState) => state.paginationOptions,
  );
  const { offset, limit } = paginationOptions;
  const [isMobile, setIsMobile] = useState(false);
  const [filteredTodoList, setFilteredTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setFilteredTodoList(todos.slice(offset, offset + limit));
  }, [offset, limit, todos]);

  return (
    <div className="todos-container">
      <div className="list-container">
        {isMobile ? (
          <Card data={filteredTodoList} />
        ) : (
          <Table data={filteredTodoList} columns={TODO_COLUMNS} />
        )}
      </div>
      <Pagination todos={todos} />
    </div>
  );
};
export default TodoList;
