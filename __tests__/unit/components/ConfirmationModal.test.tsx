import { render, fireEvent } from '@testing-library/react';
import ConfirmationModal from '@components/ConfirmationModal';
import { COMPLETE_TODO_CONFIRMATION_CONTENT, COMPLETE_TODO_CONFIRMATION_HEADING } from '@/constants/label.constants';

// Define mock functions
const onCloseMock = jest.fn();
const onApplyMock = jest.fn();

describe('ConfirmationModal Component', () => {
  it('renders the modal with the correct heading and content', () => {

    // Render the ConfirmationModal component for complete todo
    const { getByText } = render(
      <ConfirmationModal
        heading={COMPLETE_TODO_CONFIRMATION_HEADING}
        content={COMPLETE_TODO_CONFIRMATION_CONTENT}
        onClose={onCloseMock}
        onApply={onApplyMock}
        isApplying={false}
      />,
    );

    // Check heading and content will be available for complete todo
    expect(getByText(COMPLETE_TODO_CONFIRMATION_HEADING)).toBeInTheDocument();
    expect(getByText(COMPLETE_TODO_CONFIRMATION_CONTENT)).toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', () => {

    // Render the ConfirmationModal component with onCloseMock
    const { getByText } = render(
      <ConfirmationModal
        heading="Confirmation"
        content="Are you sure you want to proceed?"
        onClose={onCloseMock}
        onApply={onApplyMock}
        isApplying={false}
      />,
    );

    const closeButton = getByText('⨉');
    fireEvent.click(closeButton);

    // Check onCloseMock was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
