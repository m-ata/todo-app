import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
