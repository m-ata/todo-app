import { SubmitHandler } from "react-hook-form";

export interface IConfirmationModalProps {
    heading: string;
    content: string;
    isApplying?: boolean;
    onApply: React.MouseEventHandler<HTMLButtonElement>;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IFormInputs {
    task: string;
    deadline: string;
}

export interface IFormsModalProps {
    onClose: () => void;
    onSubmit: SubmitHandler<IFormInputs>;
    formValues: IFormInputs;
    heading: string;
    isFormSubmitting?: boolean;
}
