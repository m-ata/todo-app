// imports from react
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import component
import Button from '@components/Button';
// import interfaces
import { IFormInputs, IFormsModalProps } from '@interfaces/modal.interface';
//import style
import './styles.scss';

// Forms Modal to handle Todo forms, it's submission and validation
const FormsModal: FC<IFormsModalProps> = ({
  onClose,
  onSubmit,
  formValues,
  heading,
}: IFormsModalProps) => {
  // Initialize React Hook Form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInputs>({
    defaultValues: formValues,
  });

  // Form validation function
  const validateForm = (data: IFormInputs): boolean => {
    let isFormValid = true;

    if (data.deadline.trim() === '') { // deadline is empty
      isFormValid = false;
      setError('deadline', {
        type: 'required',
        message: 'Deadline is required',
      }, { shouldFocus: true });
    }

    if (data.task.trim() === '') { // task is empty
      isFormValid = false;
      setError('task', { type: 'required', message: 'Task is required' }, { shouldFocus: true });
    } else if (data.task.length < 10) { // task is too short
      isFormValid = false;
      setError('task', {
        type: 'minLength',
        message: 'Task must be at least 10 characters long',
      }, { shouldFocus: true });
    } else if (data.task.length > 100) { // task is too long
      isFormValid = false;
      setError('task', {
        type: 'maxLength',
        message: 'Task must be less than or equal to 100 characters',
      }, { shouldFocus: true });
    }

    return isFormValid;
  };

  // Handle form submission
  const onSubmitForm: SubmitHandler<IFormInputs> = (data) => {
    if (validateForm(data)) {
      onSubmit(data); // Proceed with form submission
    }
  };

  return (
    <>
      <div className="modal">
        <div className="header">
          <h2 className="heading"> {heading} </h2>
          <button className="btn-close" onClick={onClose}>
            ⨉
          </button>
        </div>
        <div className="horizontal-line"></div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={`input-group ${errors.task ? 'error' : ''}`}>
            <label>
              Task <span> * </span>
            </label>
            <input
              {...register('task')}
              placeholder="Write a task"
            />
            {errors.task?.type === 'required' && (
              <p className="error"> {errors.task.message} </p>
            )}
            {(errors.task?.type === 'minLength' || errors.task?.type === 'maxLength') && (
              <p className="error"> {errors.task.message} </p>
            )}
          </div>
          <div className={`input-group ${errors.deadline ? 'error' : ''}`}>
            <label>
              Deadline <span> * </span>
            </label>
            <input type="date" {...register('deadline')} />
            {errors.deadline && (
              <p className="error"> {errors.deadline.message} </p>
            )}
          </div>
          <div className="actions">
            <Button label="Cancel" onClick={onClose} category="secondary" />
            <Button label="Save" type="submit" />
          </div>
        </form>
      </div>
      <div className="overlay" />
    </>
  );
};

export default FormsModal;





