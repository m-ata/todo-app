import { render, screen } from '@testing-library/react';
import Loader from '@components/Loader';

describe('Loader component', () => {
  it('renders the loader image', () => {
    render(<Loader />);
    
    // Check if the loader image is present
    const loaderImage = screen.getByAltText('loader');
    expect(loaderImage).toBeInTheDocument();

  });

  it('has a "loader" CSS class', () => {
    const { container } = render(<Loader />);
    
    // Check if the component has a "loader" CSS class
    const loaderElement = container.getElementsByClassName('loader')[0];
    expect(loaderElement).toHaveClass('loader');
  });
});
