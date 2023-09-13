import { render, screen } from '@testing-library/react';
import EmptyData from '@components/EmptyData';
import { DATA_NOT_FOUND } from '@/constants/label.constants';

describe('EmptyData component', () => {
  it('renders the empty data image and text', () => {
    render(<EmptyData />);

    // Check if the empty data image is present
    const emptyDataImage = screen.getByAltText('empty-data');
    expect(emptyDataImage).toBeInTheDocument();

    // Check if the text matches the expected text
    const textElement = screen.getByText(DATA_NOT_FOUND);
    expect(textElement).toBeInTheDocument();
  });

  it('has a "empty-data" CSS class', () => {
    const { container } = render(<EmptyData />);

    // Check if the component has a "empty-data" CSS class
    const emptyDataElement = container.getElementsByClassName('empty-data')[0];
    expect(emptyDataElement).toHaveClass('empty-data');
  });
});
