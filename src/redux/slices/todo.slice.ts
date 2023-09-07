import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '@interfaces/todo.interface';

type InitialState = {
  todos: ITodo[];
};

const initialState: InitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
