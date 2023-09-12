import { render, fireEvent } from '@testing-library/react';
import Button from '@components/Button';
import { ADD_TODO } from '@/constants/label.constants';

describe('Button Component', () => {
    it('renders the button with label Add Todo', () => {
    const { getByText } = render(<Button label={ADD_TODO} />);
    
    // Check if the button with the label Add Todo is rendered
    expect(getByText(ADD_TODO)).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button label={ADD_TODO} onClick={onClick} />);
    const button = getByText(ADD_TODO);
    
    // Simulate a click on the button
    fireEvent.click(button);
    
    // Check onClick handler was called
    expect(onClick).toHaveBeenCalled();
  });

  it('disables the button when isLoading is true', () => {
    const { container } = render(<Button label={ADD_TODO} isLoading={true} />);
    const button = container.getElementsByClassName('btn')[0];
    
    // Check if the button is disabled
    expect(button).toBeDisabled();
  });

  it('matches the category class', () => {
    const category = 'secondary';
    const { container } = render(<Button label={ADD_TODO} category={category} />);
    
    // Check if the button has the correct category class
    expect(container.firstChild).toHaveClass(category);
  });
});
