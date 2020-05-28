import React from "react";
import _ from "lodash";


const Pagination = (props) => {
  const { counter, pageSize, currentPage, onPageChange } = props;
  console.log('page'+ currentPage);
  const pagesCount = Math.ceil(counter / pageSize);
  if (pagesCount === 1) {
    return null;
  } else {
    const pages = _.range(1, pagesCount + 1);
    return (
      <nav aria-label="change pages">
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li key={page} className="page-item">
              <a
                className={
                  page === currentPage
                    ? "page-link bg-dark text-white"
                    : "page-link"
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};

export default Pagination;
