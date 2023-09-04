import Button from '@components/Button';
import TodoIcon from '/todo-list.svg';
import PlusIcon from '/plus.svg';
import './styles.scss';

const Header = () => {
  return (
    <header>
      <img className="todo-icon" src={TodoIcon} alt="todo-icon" />
      <h5> Todo App </h5>
      <Button text="Add Todo" icon={PlusIcon} onClick={() => console.log('add todo')} />
    </header>
  );
};

export default Header;
