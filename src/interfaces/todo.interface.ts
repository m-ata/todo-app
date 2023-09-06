export interface ITodo {
  id: string;
  task: string;
  deadline: number;
  isCompleted: boolean;
}

export interface IAddTodoProps {
  onClose: () => void;
}

export interface ITableProps {
  columns: string[];
  data: ITodo[];
}