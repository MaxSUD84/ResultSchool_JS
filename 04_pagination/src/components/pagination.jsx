import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  
  const countPage = Math.ceil(itemsCount / pageSize);
  if (countPage === 1) return null;
  const pages = _.range(1, countPage + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={"page_" + page} className={"page-item" + (currentPage === page ? " active" : "")}>
            <button href="" className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
