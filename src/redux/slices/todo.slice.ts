import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "@interfaces/todo.interface";

type IinitialState = {
    todos: ITodo[]
}

const initialState: IinitialState = {
    todos: []
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
