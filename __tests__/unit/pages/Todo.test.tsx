import { screen } from '@testing-library/react';
import * as todoServiceModule from '@redux/services/todo.service';
import { MockProvider } from '__tests__/mock/MockProvider.test';
import { mockData } from '__tests__/mock/data';
import Todo from '@pages/Todo';
import { ITodo } from '@/interfaces/todo.interface';
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

jest.mock('@redux/slices/todo.slice', () => ({
  setTodo: jest.fn(),
}));

describe('Todo Page', () => {
  it('renders the Todo component correctly', async () => {

    jest.spyOn(todoServiceModule, 'useGetTodosQuery').mockReturnValue({
      data: mockData.todos,
      error: null,
      isLoading: false,
      refetch: function (): QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, 'Todos', ITodo[], 'todoApi'>> {
        throw new Error('Function not implemented.');
      }
    });

    MockProvider(<Todo />);
    // check mock task exist in the DOm or not
    expect(screen.getByText('Mock Task 1')).toBeInTheDocument();
  });
});
