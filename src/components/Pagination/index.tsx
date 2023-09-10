import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers/rootReducer';
import {
  IPaginationOption,
  IPaginationProps,
} from '@interfaces/pagination.interface';
import { setPaginationOptions } from '@/redux/slices/pagination.slice';
import chevronLeft from '/icons/chevron-left.svg';
import chevronDoubleLeft from '/icons/chevron-double-left.svg';
import chevronRight from '/icons/chevron-right.svg';
import chevronDoubleRight from '/icons/chevron-double-right.svg';

import './styles.scss';

const Pagination: FC<IPaginationProps> = ({
  todos,
  currentTodosAmount, // current page todo list length
}: IPaginationProps) => {
  // pagination options from Redux store
  const { paginationOptions } = useSelector(
    (state: RootState) => state.paginationOptions,
  );
  const dispatch = useDispatch();
  const { currentPage, totalPages, offset, size, limit, limitOptions } =
    paginationOptions;

  // Update pagination options in Redux store
  const handlePagination = (option: IPaginationOption) => {
    dispatch(setPaginationOptions(option));
  };

  useEffect(() => {
    const todoSize = todos?.length || 0;

    // calculate new pagination options
    const newPaginationOptions = {
      ...paginationOptions,
      size: todoSize,
      offset:
        currentTodosAmount === 0 && offset >= limit ? offset - limit : offset,
      currentPage:
        currentTodosAmount === 0 && offset >= limit
          ? currentPage - 1
          : currentPage,
      totalPages: Math.ceil(todoSize / limit),
    };

    handlePagination(newPaginationOptions);
  }, [todos, limit, currentTodosAmount]);

  return (
    <div className="pagination">
      <div className="page-items">
        <span>Items per page</span>
        <select
          value={limit}
          onChange={(e) =>
            handlePagination({
              ...paginationOptions,
              limit: Number(e.target.value),
              offset: 0,
              currentPage: 1,
              totalPages: size / Number(e.target.value),
            })
          }
        >
          {limitOptions.map((option: number) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="item-count">
        <span>
          {currentPage} / {Math.ceil(totalPages) || 1}
        </span>
      </div>

      <div className="actions">
        {/* Handle First Page */}
        <button
          disabled={offset === 0}
          onClick={() =>
            handlePagination({
              ...paginationOptions,
              offset: 0,
              currentPage: 1,
            })
          }
        >
          <img src={chevronDoubleLeft} alt="chevron-double-left" />
        </button>
        {/* Handle Previous Page */}
        <button
          disabled={offset === 0}
          onClick={() =>
            handlePagination({
              ...paginationOptions,
              offset: offset - limit,
              currentPage: currentPage - 1,
            })
          }
        >
          <img src={chevronLeft} alt="chevron-left" />
        </button>
        {/* Handle Next Page */}
        <button
          disabled={offset + limit >= size}
          onClick={() =>
            handlePagination({
              ...paginationOptions,
              offset: offset + limit,
              currentPage: currentPage + 1,
            })
          }
        >
          <img src={chevronRight} alt="chevron-right" />
        </button>
        {/* Handle Last Page */}
        <button
          disabled={offset + limit >= size}
          onClick={() =>
            handlePagination({
              ...paginationOptions,
              offset: size - (size % limit === 0 ? limit : size % limit),
              currentPage: totalPages,
            })
          }
        >
          <img src={chevronDoubleRight} alt="chevron-double-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
