import { FC } from 'react';
import { IButtonProps } from '@/interfaces/button.interface';
import Spinner from '/gifs/spinner.svg';
import './styles.scss';

const Button: FC<IButtonProps> = (props: IButtonProps) => {
  const {
    label,
    onClick,
    icon,
    isLoading = false,
    category = 'primary',
    type = 'button',
  } = props;
  return (
    <button
      type={type}
      className={`btn ${category}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <img src={Spinner} alt="loader" />}
      {icon && <img src={icon} alt="icon" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
