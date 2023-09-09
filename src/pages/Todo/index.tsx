import Header from '@components/Header';
import TodoList from '@components/TodoList';
import './styles.scss';
import { useGetTodosQuery } from '@/redux/services/todo.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTodo } from '@redux/slices/todo.slice';
import { ITodo, RTKQueryResponse } from '@/interfaces/todo.interface';

const Todo = () => {
  const { data } = useGetTodosQuery() as RTKQueryResponse;
  const dispatch = useDispatch();

  // setting todo in store on componentDidMount
  useEffect(() => {
    dispatch(setTodo(data as ITodo[]));
  }, [data]);

  return (
    <div className="container">
      <Header />
      <TodoList />
    </div>
  );
};

export default Todo;
