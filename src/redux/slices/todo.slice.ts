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
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos = state.todos.map((todo: ITodo) => todo.id === action.payload.id ? action.payload : todo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
