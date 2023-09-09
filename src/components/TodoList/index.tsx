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
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '@/constants';
import {
  IDeleteResponse,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';

import './styles.scss';
import ConfirmationModal from '../ConfirmationModal';
import { UPSERT_TODO_TYPE } from '@/enum/upsert-todo.enum';
import { updateTodo, deleteTodo } from '@/redux/slices/todo.slice';
import EditTodo from '@components/EditTodo';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/redux/services/todo.service';
import { toast } from 'react-toastify';
import { getApiError } from '@/utils/apiError.utils';

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

  // mutations
  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();

  // handle responsiveness
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
    if (todos) setFilteredTodoList(todos.slice(offset, offset + limit));
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

  // update todo into store for complete todo and opens edit modal based on the condition
  const handleUpdateTodo = async () => {
    try {
      if (showCompleteTodoModal) {
        const updatedTodo = {
          ...selectedTodo,
          isCompleted: true,
        };
        const { data, error } = (await updateTodoMutation(
          updatedTodo,
        )) as RTKQueryResponse;
        if (data) {
          dispatch(updateTodo(data as ITodo)); // update completed todo in store
          toast.success(SUCCESS_MESSAGES.COMPLETED);
          setShowCompleteTodoModal(false);
        }
        if (error) toast.error(getApiError(error.status as number));
      } else setShowEditTodoModal(false);
      setSelectedTodo(DEFAULT_TODO);
    } catch (error) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  };

  // delete todo from store
  const handleDeleteTodo = async () => {
    try {
      if (selectedTodo?.id) {
        const { data, error } = (await deleteTodoMutation(
          selectedTodo.id,
        )) as RTKQueryResponse;
        const response = data as IDeleteResponse;
        if (response.success) {
          dispatch(deleteTodo(response.id)); // delete todo from store
          toast.success(SUCCESS_MESSAGES.DELETED);
          setShowDeleteTodoModal(!showDeleteTodoModal);
        }
        if (error) toast.error(getApiError(error.status as number));
      }
      setSelectedTodo(DEFAULT_TODO);
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
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
