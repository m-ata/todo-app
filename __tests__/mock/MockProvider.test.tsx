import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { mockData } from './data';
import rootReducer from '@/redux/reducers/rootReducer';
import { configureStore,  } from '@reduxjs/toolkit';

// Mock the import.meta.env object
jest.mock('vite', () => ({
  ...(jest.requireActual('vite')),
  defineConfig: () => ({
    define: {
      'import.meta.env': {
        VITE_API_URL: 'http://localhost:5147/api',
      },
    },
  }),
}));

// Mock the useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/ban-types
const mockStore = configureStore({reducer: rootReducer});

// Set up the useSelector mock to return your mock data
beforeEach(() => {
  (useSelector as jest.Mock).mockImplementation((selectorFn) =>
    selectorFn({ todos: mockData }) // Replace 'yourReducerKey' with your actual reducer key
  );
});

// Clear the mock implementation after each test
afterEach(() => {
  (useSelector as jest.Mock).mockClear();
});

// Mock setup provider
export const MockProvider = (children: React.ReactNode) => {
  return render(<Provider store={mockStore}>{children}</Provider>);
};
