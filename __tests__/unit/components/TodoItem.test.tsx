import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '@components/TodoItem';
import * as useStatusModule from '@hooks/useStatus';

// Mock useStatus hook
jest.mock('@hooks/useStatus', () => ({
  useStatus: jest.fn(),
}));
// create a mock function for handleUpsert
const handleUpsertMock = jest.fn();

describe('TodoItem component', () => {
  it('renders the component with task and deadline', () => {
    // mock todo
    const todo = {
      id: 1,
      task: 'Test Task',
      deadline: '2023-09-30T12:00:00Z',
      isCompleted: false,
    };

    // Mock the useStatus hook's return value
    jest.spyOn(useStatusModule, 'useStatus').mockReturnValue('pending');

    // Render the TodoItem component with the mock data
    render(
      <TodoItem
        todo={todo}
        isMobile={true}
        handleUpsert={handleUpsertMock}
      />,
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('30.09.2023')).toBeInTheDocument(); // formatted date
  });

  it('calls handleUpsert when delete button is clicked', () => {
    const todo = {
      id: 2,
      task: 'Delete Task',
      deadline: '2023-10-15T12:00:00Z',
      isCompleted: false,
    };
    

    render(
      <TodoItem todo={todo} isMobile={true} handleUpsert={handleUpsertMock} />
    );

    // Click the delete button
    fireEvent.click(screen.getByAltText('delete-icon'));

    // Check handleUpsertMock was called with the correct delete arguments
    expect(handleUpsertMock).toHaveBeenCalledWith(todo, 'delete');
  });
});
