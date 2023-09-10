import { FC } from 'react';
// import required interfaces
import { ICardProps, ITodo } from '@interfaces/todo.interface';
// import components
import EmptyData from '@components/EmptyData';
import TodoItem from '@components/TodoItem';

// Cards component that displays a list of todos as cards.
const Cards: FC<ICardProps> = ({
  data,
  isMobile,
  handleUpsert,
}: ICardProps) => (
  <>
    {/* Display an "EmptyData" component if there are no todos in the data. */}
    {!data?.length && <EmptyData />}
    {/* Map over the todo data and render a TodoItem component for each todo as card. */}
    {data.map((item: ITodo) => (
      <TodoItem
        key={item.id}
        todo={item}
        isMobile={isMobile}
        handleUpsert={handleUpsert}
      />
    ))}
  </>
);

export default Cards;
