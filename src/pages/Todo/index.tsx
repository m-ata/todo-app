import Header from '@components/Header';
import TodoList from '@components/TodoList';
import './styles.scss';
import { useGetTodosQuery } from '@/redux/services/todo.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTodo } from '@redux/slices/todo.slice';
import { ITodo, RTKQueryResponse } from '@/interfaces/todo.interface';
import { toast } from 'react-toastify';
import { getApiError } from '@/utils/apiError.utils';

const Todo = () => {
  const { data, error } = useGetTodosQuery() as RTKQueryResponse;
  const dispatch = useDispatch();
  console.log(data, error);
  // setting todo in store on componentDidUpdate
  useEffect(() => {
    if (data)
    dispatch(setTodo(data as ITodo[]));
    if (error) toast.error(getApiError(error));
  }, [data]);

  return (
    <div className="container">
      <Header />
      <TodoList />
    </div>
  );
};

export default Todo;
