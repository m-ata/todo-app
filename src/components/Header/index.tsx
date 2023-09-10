import { useState } from 'react';
// import components
import Button from '@components/Button';
import AddTodo from '@components/AddTodo';
// import icons
import plusIcon from '/icons/plus.svg';
import todoListImage from '/images/todo-list.svg';
// import style
import './styles.scss';

const Header = () => {
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  // toggle add todo modal
  const handleShowHideModal = () => setAddTodoModalOpen(!addTodoModalOpen);

  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img className="logo" src={todoListImage} alt="todo-list" />
          <span className="heading"> Todo App </span>
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
