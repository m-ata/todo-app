import { api } from './api';
import { ITodo } from '@interfaces/todo.interface';

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], void>({
      query: () => '/todos',
    }),
    addTodo: build.mutation<ITodo, Partial<ITodo>>({
      query(todo) {
        return {
          url: '/addTodo',
          method: 'POST',
          body: todo,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    updateTodo: build.mutation<ITodo, Partial<ITodo>>({
      query(todo) {
        const { id } = todo;
        return {
          url: `/updateTodo/${id}`,
          method: 'PUT',
          body: todo,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: build.mutation<ITodo, number>({
      query(id) {
        return {
          url: `/deleteTodo/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
