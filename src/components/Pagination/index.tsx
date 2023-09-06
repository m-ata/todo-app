import { DEFAULT_PAGINATION_OPTIONS } from "@/constants";
import chevronLeft from "/icons/chevron-left.svg";
import chevronDoubleLeft from "/icons/chevron-double-left.svg";
import chevronRight from "/icons/chevron-right.svg";
import chevronDoubleRight from "/icons/chevron-double-right.svg";

import "./styles.scss";

const Pagination = () => {
  // implementation will be done later
  const { currentPage, totalPages, offset, size, limit, limitOptions } =
    DEFAULT_PAGINATION_OPTIONS;

  return (
    <div className="pagination">
      <div className="page-items">
        <span> Items per page </span>
        <select value={limit} onChange={(e) => console.log(e.target.value)}>
          {limitOptions.map((option: number) => (
            <option value={option} key={option}>
              {" "}
              {option}{" "}
            </option>
          ))}
        </select>
      </div>

      <div className="item-count">
        <span>
          {" "}
          {currentPage} / {Math.ceil(totalPages)}{" "}
        </span>
      </div>

      <div className="actions">
        <button
          disabled={offset === 0}
          onClick={() => console.log("Previous Starte")}
        >
          <img src={chevronDoubleLeft} alt="chevron-double-left" />
        </button>
        <button disabled={offset === 0} onClick={() => console.log("Previous")}>
          <img src={chevronLeft} alt="chevron-left" />
        </button>
        <button
          disabled={offset + limit >= size}
          onClick={() => console.log("next")}
        >
          <img src={chevronRight} alt="chevron-right" />
        </button>
        <button
          disabled={offset + limit >= size}
          onClick={() => console.log("Next End")}
        >
          <img src={chevronDoubleRight} alt="chevron-double-left" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
