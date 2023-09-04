export interface IButtonProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    isLoading?: boolean;
}
