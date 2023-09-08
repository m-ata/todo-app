export interface ITodo {
  id: string;
  task: string;
  deadline: number;
  isCompleted: boolean;
}

export interface IAddTodoProps {
  onClose: () => void;
}

export interface IEditTodoProps extends IAddTodoProps {
  todo: ITodo
}

export interface ICardProps {
  data: ITodo[];
  // eslint-disable-next-line no-unused-vars
  handleUpsert: (todo: ITodo, upsertType: string) => void;
}

export interface ITableProps extends ICardProps {
  columns: string[];
}
