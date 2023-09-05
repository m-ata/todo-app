import Header from '@components/Header';
import TodoList from '@components/TodoList';
import './styles.scss';

const Todo = () => {
  return (
    <div className="container">
      <Header />
      <TodoList />
    </div>
  );
};

export default Todo;
