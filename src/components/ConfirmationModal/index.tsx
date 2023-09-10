import { FC } from 'react';
// import interfaces
import { IConfirmationModalProps } from '@interfaces/modal.interface';
// import component
import Button from '@components/Button';
// import styles
import './styles.scss';

const ConfirmationModal: FC<IConfirmationModalProps> = ({
  heading,
  content,
  onClose,
  onApply,
}: IConfirmationModalProps) => {
  return (
    <>
      <div className="modal">
        <div className="header">
          <h2 className="heading"> {heading} </h2>
          <button className="btn-close" onClick={onClose}>
            ⨉
          </button>
        </div>
        <hr />
        <div className="body"> {content} </div>
        <div className="footer">
          <Button
            label="Cancel"
            onClick={onClose}
            category="secondary"
            type="button"
          />
          <Button label="OK" onClick={onApply} type="button" />
        </div>
      </div>
      <div className="overlay" />
    </>
  );
};

export default ConfirmationModal;
