import { FC } from 'react';
import { IButtonProps } from '@/interfaces/button.interface';
import Loader from '/loader.svg';
import './styles.scss';

const Button: FC<IButtonProps> = (props: IButtonProps) => {
  const { text, onClick, icon, isLoading = false } = props;
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading && <img src={Loader} alt="loader" />}
      {icon && <img src={icon} alt="icon" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
