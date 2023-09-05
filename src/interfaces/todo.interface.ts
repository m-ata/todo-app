export interface ITodo {
    id: string;
    task: string;
    deadline: number | null;
    isCompleted: boolean;
};

export interface IAddTodoProps {
    onClose: () => void;
}