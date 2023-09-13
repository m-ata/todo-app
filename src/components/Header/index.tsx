// imports from react
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import components
import Button from '@components/Button';
import AddTodo from '@components/AddTodo';
// import icons
import plusIcon from '/icons/plus.svg';
import todoListImage from '/images/todo-list.svg';
//redux related import
import { RootState } from '@/redux/reducers/rootReducer';
// import constant
import { TODO_APP_LABEL } from '@/constants/label.constants';
// import style
import './styles.scss';

const Header = () => {
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  const { todos } = useSelector((state: RootState) => state.todos);

  // toggle add todo modal
  const handleShowHideModal = () => setAddTodoModalOpen(!addTodoModalOpen);

  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img className="logo" src={todoListImage} alt="todo-list" />
          <div className="heading">
            {' '}
            {TODO_APP_LABEL}{' '}
            {todos?.length > 0 && <span> ({todos.length}) </span>}{' '}
          </div>
        </div>
        <div className="btn-container">
          <Button
            label="Add Todo"
            icon={plusIcon}
            onClick={handleShowHideModal}
          />
        </div>
      </header>
      {addTodoModalOpen && <AddTodo onClose={handleShowHideModal} />}
    </>
  );
};

export default Header;
