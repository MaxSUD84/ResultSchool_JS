import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  const countPage = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, countPage + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={"page_" + page} className="page-item">
            <a href="" className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
