import chevronLeft from '/icons/chevron-left.svg';
import chevronDoubleLeft from '/icons/chevron-double-left.svg';
import chevronRight from '/icons/chevron-right.svg';
import chevronDoubleRight from '/icons/chevron-double-right.svg';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers/rootReducer';
import {
  IPaginationOption,
  IPaginationProps,
} from '@interfaces/pagination.interface';
import { setPaginationOptions } from '@/redux/slices/pagination.slice';
import { FC, useEffect } from 'react';

const Pagination: FC<IPaginationProps> = ({ todos }: IPaginationProps) => {
  const { paginationOptions } = useSelector(
    (state: RootState) => state.paginationOptions,
  );
  const dispatch = useDispatch();
  const { currentPage, totalPages, offset, size, limit, limitOptions } =
    paginationOptions;

  const handlePagination = (option: IPaginationOption) => {
    dispatch(setPaginationOptions(option));
  };

  useEffect(() => {
    const todoSize = todos?.length || 0;
    handlePagination({
      ...paginationOptions,
      size: todoSize,
      totalPages: Math.ceil(todoSize / limit),
    });
  }, [todos, limit]);

  return (
    <div className="pagination">
      <div className="page-items">
        <span> Items per page </span>
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
              {' '}
              {option}{' '}
            </option>
          ))}
        </select>
      </div>

      <div className="item-count">
        <span>
          {' '}
          {currentPage} / {Math.ceil(totalPages) || 1}{' '}
        </span>
      </div>

      <div className="actions">
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
          <img src={chevronDoubleRight} alt="chevron-double-left" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
