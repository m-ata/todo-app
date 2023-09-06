import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './../slices/todo.slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistTodos = {
  key: 'todos',
  storage,
};

const rootReducer = combineReducers({
  todos: persistReducer(persistTodos, todosReducer),
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
