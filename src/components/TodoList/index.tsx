import { useSelector } from "react-redux";
import { RootState } from "@redux/reducers/rootReducer";
import { ITodo } from "@/interfaces/todo.interface";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  return (
    <div>
      {todos.map((todo: ITodo) => (
        <p key={todo.id}> {todo.task} </p>
      ))}
    </div>
  );
};
export default TodoList;
