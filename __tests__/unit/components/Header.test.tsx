import { screen, fireEvent } from '@testing-library/react';
import Header from '@components/Header'; // Adjust the import path accordingly
import { MockProvider } from '__tests__/mock/MockProvider.test';
import { ADD_TODO, TODO_APP_LABEL } from '@/constants/label.constants';

describe('Header Component', () => {
  it('renders the component with the correct title', () => {
    MockProvider(<Header />);

    // Check if the title is rendered
    expect(screen.getByText(TODO_APP_LABEL)).toBeInTheDocument();
  });

  it('renders the "Add Todo" button', () => {
    MockProvider(<Header />);

    // Check if the "Add Todo" button is rendered
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('opens the AddTodo modal when "Add Todo" button is clicked', () => {
    MockProvider(<Header />);

    // Check if the AddTodo modal is initially closed
    expect(screen.queryByText(ADD_TODO)).not.toBeInTheDocument(); // Adjust this line with your actual modal content

    // Click the "Add Todo" button
    fireEvent.click(screen.getByText('Add Todo'));

    // Check if the AddTodo modal is opened
    expect(screen.getByText(ADD_TODO)).toBeInTheDocument(); // Adjust this line with your actual modal content
  });
});
