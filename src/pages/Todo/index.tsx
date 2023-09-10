// imports from react
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import components
import Header from '@components/Header';
import TodoList from '@components/TodoList';
//imports from redux
import { useGetTodosQuery } from '@redux/services/todo.service';
import { setTodo } from '@redux/slices/todo.slice';
// import interfaces
import { ITodo, RTKQueryResponse } from '@/interfaces/todo.interface';
// import util
import { getApiError } from '@/utils/apiError.util';
// import constant
import { TOAST_AUTO_CLOSE } from '@/constants';
// import style
import './styles.scss';
import withLoading from '@hoc/withLoading';

const Todo = () => {
  // api call using RTK Query to get todos
  const { data, error, isLoading } = useGetTodosQuery() as RTKQueryResponse;

  const dispatch = useDispatch();

  // componentDidUpdate (data, error)
  useEffect(() => {
    if (data) dispatch(setTodo(data as ITodo[])); // setting todo in store
    // showing error in toast
    if (error) toast.error(getApiError(error), {
      autoClose: TOAST_AUTO_CLOSE.ERROR,
    });
  }, [data, error]);

  return (
    <div className="container">
      <Header />
      {withLoading(TodoList, isLoading)({isLoading})}
    </div>
  );
};

export default Todo;
