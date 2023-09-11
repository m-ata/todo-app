import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '@pages/NotFound';
import {
  PAGE_NOT_FOUND,
  NOT_FOUND_DESCRIPTION,
  GO_HOME_BUTTON,
} from '@/constants/label.constants';
import { HTTP_STATUS_CODES } from '@/enum/status.enum';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('NotFound Page', () => {
  it('renders the component with correct content', () => {
    render(<NotFound />);

    // check if the HTTP status code is rendered
    expect(screen.getByText(HTTP_STATUS_CODES.NOT_FOUND)).toBeInTheDocument();

    // check if the page title is rendered
    expect(screen.getByText(PAGE_NOT_FOUND)).toBeInTheDocument();

    // check if the description is rendered
    expect(screen.getByText(NOT_FOUND_DESCRIPTION)).toBeInTheDocument();

    // check if the "Go Home" button is rendered
    expect(screen.getByText(GO_HOME_BUTTON)).toBeInTheDocument();
  });

  it('clicking the "Go Home" button navigates to the home page', () => {
    render(<NotFound />);

    // click the "Go Home" button
    fireEvent.click(screen.getByText(GO_HOME_BUTTON));

    // check if the navigate function was called with the correct path
    expect(mockUsedNavigate).toHaveBeenCalledWith('/');
  });
});
