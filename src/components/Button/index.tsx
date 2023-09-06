import { FC } from 'react';
import { IButtonProps } from '@/interfaces/button.interface';
import Loader from '/gifs/loader.svg';
import './styles.scss';

const Button: FC<IButtonProps> = (props: IButtonProps) => {
  const {
    label,
    onClick,
    icon,
    isLoading = false,
    category = 'primary',
    type,
  } = props;
  return (
    <button
      type={type}
      className={`btn ${category}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <img src={Loader} alt="loader" />}
      {icon && <img src={icon} alt="icon" />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
