import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page, event) => {
    event.preventDefault();  // 기본 동작(링크 이동) 방지
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? "record" : ""}>
          <a href="#" onClick={(event) => handlePageChange(i, event)} className={i === currentPage ? "this" : ""}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="Pagination">
      <div className="ec-base-paginate">
        <ol>
          <li>
            <a href="#" onClick={(event) => handlePageChange(1, event)} className="first">
              &lt;&lt; {/* 처음 페이지로 */}
            </a>
          </li>
          <li>
            <a href="#" onClick={(event) => handlePageChange(currentPage - 1, event)}>
              &lt; {/* 이전 페이지로 */}
            </a>
          </li>
        </ol>
        <ol>
          {renderPagination()}
        </ol>
        <ol>
          <li>
            <a href="#" onClick={(event) => handlePageChange(currentPage + 1, event)}>
              &gt; {/* 다음 페이지로 */}
            </a>
          </li>
          <li>
            <a href="#" onClick={(event) => handlePageChange(totalPages, event)} className="last">
              &gt;&gt; {/* 마지막 페이지로 */}
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Pagination;