import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '@redux/reducers/rootReducer';
import Pagination from '../Pagination';
import Table from '@components/Table';
import Card from '@components/Card';
import {
  COMPLETE_TODO_CONFIRMATION_CONTENT,
  COMPLETE_TODO_CONFIRMATION_HEADING,
  DELETE_TODO_CONFIRMATION_CONTENT,
  DELETE_TODO_CONFIRMATION_HEADING,
  TODO_COLUMNS,
  DEFAULT_TODO,
} from '@/constants';
import { ITodo } from '@/interfaces/todo.interface';

import './styles.scss';
import ConfirmationModal from '../ConfirmationModal';
import { UPSERT_TODO_TYPE } from '@/enum/upsert-todo.enum';
import { updateTodo, deleteTodo } from '@/redux/slices/todo.slice';
import EditTodo from '@components/EditTodo';

const TodoList = () => {
  // local states
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [filteredTodoList, setFilteredTodoList] = useState<ITodo[]>([]);
  const [showCompleteTodoModal, setShowCompleteTodoModal] =
    useState<boolean>(false);
  const [showDeleteTodoModal, setShowDeleteTodoModal] =
    useState<boolean>(false);
  const [showEditTodoModal, setShowEditTodoModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo>(DEFAULT_TODO);

  // redux states
  const { todos } = useSelector((state: RootState) => state.todos);
  const { paginationOptions } = useSelector(
    (state: RootState) => state.paginationOptions,
  );
  const { offset, limit } = paginationOptions;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setFilteredTodoList(todos.slice(offset, offset + limit));
  }, [offset, limit, todos]);

  // opens delete, complete and edit todo modal
  const handleOpenUpsertModal = (todo: ITodo, upsertType: string) => {
    setSelectedTodo(todo);
    switch (upsertType) {
      case UPSERT_TODO_TYPE.COMPLETE:
        setShowCompleteTodoModal(true);
        break;
      case UPSERT_TODO_TYPE.DELETE:
        setShowDeleteTodoModal(true);
        break;
      case UPSERT_TODO_TYPE.EDIT:
        setShowEditTodoModal(true);
        break;
      default:
        break;
    }
  };

  // update todo into store
  const handleUpdateTodo = () => {
    if (showCompleteTodoModal) {
      dispatch(updateTodo({ ...selectedTodo, isCompleted: true }));
      setShowCompleteTodoModal(false);
    } else setShowEditTodoModal(false);
    setSelectedTodo(DEFAULT_TODO);
  };

  // delete todo from store
  const handleDeleteTodo = () => {
    if (selectedTodo) {
      dispatch(deleteTodo(selectedTodo?.id));
      setShowDeleteTodoModal(!showDeleteTodoModal);
    }
    setSelectedTodo(DEFAULT_TODO);
  };

  return (
    <div className="todos-container">
      <div className="list-container">
        {isMobile ? (
          <Card data={filteredTodoList} handleUpsert={handleOpenUpsertModal} />
        ) : (
          <Table
            data={filteredTodoList}
            columns={TODO_COLUMNS}
            handleUpsert={handleOpenUpsertModal}
          />
        )}
      </div>
      <Pagination todos={todos} />
      {showCompleteTodoModal && (
        <ConfirmationModal
          heading={COMPLETE_TODO_CONFIRMATION_HEADING}
          content={COMPLETE_TODO_CONFIRMATION_CONTENT}
          onClose={() => setShowCompleteTodoModal(!showCompleteTodoModal)}
          onApply={handleUpdateTodo}
        />
      )}
      {showDeleteTodoModal && (
        <ConfirmationModal
          heading={DELETE_TODO_CONFIRMATION_HEADING}
          content={DELETE_TODO_CONFIRMATION_CONTENT}
          onClose={() => setShowDeleteTodoModal(!showDeleteTodoModal)}
          onApply={handleDeleteTodo}
        />
      )}
      {showEditTodoModal && (
        <EditTodo todo={selectedTodo} onClose={handleUpdateTodo} />
      )}
    </div>
  );
};
export default TodoList;
