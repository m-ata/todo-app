import { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: string;
  isLoading?: boolean;
  category?: "primary" | "secondary";
}
