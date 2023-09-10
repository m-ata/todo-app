import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
// import required components
import Pagination from '@components/Pagination';
import Table from '@components/Table';
import Cards from '@components/Cards';
import ConfirmationModal from '@components/ConfirmationModal';
import EditTodo from '@components/EditTodo';
// redux related imports
import { RootState } from '@redux/reducers/rootReducer';
import { updateTodo, deleteTodo } from '@redux/slices/todo.slice';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@redux/services/todo.service';
//import constants
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
// import interfaces
import {
  IDeleteResponse,
  ITodo,
  RTKQueryResponse,
} from '@interfaces/todo.interface';
// import custom hooks
import { getApiError } from '@utils/apiError.utils';
import { useMobile } from '@hooks/useMobile';
// import enum
import { UPSERT_TODO_TYPE } from '@/enum/upsert-todo.enum';
// import style
import './styles.scss';

const TodoList = () => {
  // local states
  const isMobile = useMobile();
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

  // memoized filtered todo list
  const filteredTodoList = useMemo(
    () => todos?.slice(offset, offset + limit) ?? [],
    [offset, limit, todos],
  );

  // Memoized handleOpenUpsertModal to opens delete, complete and edit todo modal
  const handleOpenUpsertModal = useCallback(
    (todo: ITodo, upsertType: string) => {
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
    },
    [],
  );

  // Memoized handleUpdateTodo component to update todo
  const handleUpdateTodo = useCallback(async () => {
    try {
      if (showCompleteTodoModal) {
        const updatedTodo = {
          ...selectedTodo,
          isCompleted: true,
        };
        const { data, error } = (await updateTodoMutation(
          updatedTodo,
        )) as RTKQueryResponse; // call api using RTK updateTodoMutation
        if (data) {
          dispatch(updateTodo(data as ITodo)); // update completed todo in store
          toast.success(SUCCESS_MESSAGES.COMPLETED);
          setShowCompleteTodoModal(false);
        }
        if (error) toast.error(getApiError(error));
      } else setShowEditTodoModal(false);
      setSelectedTodo(DEFAULT_TODO);
    } catch (error) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  }, [selectedTodo, showCompleteTodoModal, showEditTodoModal]);

  // Memoized handleDeleteTodo function to delete todo from store
  const handleDeleteTodo = useCallback(async () => {
    try {
      if (selectedTodo?.id) {
        const { data, error } = (await deleteTodoMutation(
          selectedTodo.id,
        )) as RTKQueryResponse; // call api using RTK deleteTodoMutation
        const response = data as IDeleteResponse;
        if (response.success) {
          dispatch(deleteTodo(response.id)); // delete todo from store
          toast.success(SUCCESS_MESSAGES.DELETED);
          setShowDeleteTodoModal(!showDeleteTodoModal);
        }
        if (error) toast.error(getApiError(error));
      }
      setSelectedTodo(DEFAULT_TODO);
    } catch (err) {
      toast.error(ERROR_MESSAGES.SOMETHING_WRONG);
    }
  }, [selectedTodo, showDeleteTodoModal]);

  return (
    <div className="todos-container">
      <div className="list-container">
        {isMobile ? (
          <Cards
            data={filteredTodoList}
            handleUpsert={handleOpenUpsertModal}
            isMobile={true}
          />
        ) : (
          <Table
            data={filteredTodoList}
            columns={TODO_COLUMNS}
            handleUpsert={handleOpenUpsertModal}
            isMobile={false}
          />
        )}
      </div>
      <Pagination todos={todos} currentTodosAmount={filteredTodoList.length} />
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
