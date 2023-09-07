export interface IConfirmationModalProps {
    heading: string;
    content: string;
    onApply: React.MouseEventHandler<HTMLButtonElement>;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
}
