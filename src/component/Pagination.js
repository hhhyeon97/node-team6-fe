import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPageNum, forcePage, onPageChange }) => {
  const isFirstPage = forcePage === 0; // forcePage가 0일 때 첫 번째 페이지로 간주
  const isLastPage = forcePage === totalPageNum - 1;
    return (
      <ReactPaginate
        nextLabel=">"
        onPageChange={onPageChange} // 페이지를 바꿀때마다 호출하는 함수
        pageRangeDisplayed={5} // 몇 개의 페이지를 보여줄지
        pageCount={totalPageNum} // 전체 페이지가 몇 개인지
        marginPagesDisplayed={1} // 양 끝에 표시될 페이지 개수
        forcePage={forcePage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName={`pre ${isFirstPage ? 'pg_disabled' : ''}`}
        previousLinkClassName="page-link"
        nextClassName={`next ${isLastPage ? 'pg_disabled' : ''}`}
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="nc_pagination"
      />
    );
};

export default Pagination;
