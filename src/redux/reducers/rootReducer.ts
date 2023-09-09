import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './../slices/todo.slice';
import paginationReducer from './../slices/pagination.slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '../services/api';

const persistTodos = {
  key: 'todos',
  storage,
};

const rootReducer = combineReducers({
  todos: persistReducer(persistTodos, todosReducer),
  paginationOptions: paginationReducer,
  [api.reducerPath]: api.reducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
