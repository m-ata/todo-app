import Button from '@components/Button';
import TodoIcon from '/images/todo-list.svg';
import PlusIcon from '/icons/plus.svg';
import './styles.scss';
import { useState } from 'react';
import AddTodo from '@components/AddTodo';

const Header = () => {
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  const handleShowHideModal = () => setAddTodoModalOpen(!addTodoModalOpen);

  return (
    <>
      <header>
        <img className="todo-icon" src={TodoIcon} alt="todo-icon" />
        <h5> Todo App </h5>
        <Button
          label="Add Todo"
          icon={PlusIcon}
          onClick={handleShowHideModal}
        />
      </header>
      {addTodoModalOpen && <AddTodo onClose={handleShowHideModal} />}
    </>
  );
};

export default Header;
