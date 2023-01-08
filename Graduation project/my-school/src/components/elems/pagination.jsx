// import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import styles from "../../styles/styles";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  //   console.log(pages);

  return (
    <div className={`${styles.flexCenter} pt-4`}>
      <nav>
        <ul className="flex flex-row">
          {pages.map((page) => (
            <li
              className={"ring-2" + (currentPage === page ? "" : "")}
              key={"page_" + page}
            >
              <button
                className={`${styles.btnPrmLight}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
