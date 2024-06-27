import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as types from "../../constants/review.constants";
import { Col, Row, Container, Button  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from '../../action/reviewAction';
import LinedTitle from '../../component/LinedTitle';
import ReviewTable from '../../component/admin_page/ReviewTable';
import SearchBox from '../../component/SearchBox';
import Pagination from '../../component/Pagination';

const AdminReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviewList, totalPageNum } = useSelector((state) => state.review);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || ""
  });
  const tableHeader = [
    "공연정보",
    "회원명",
    "회원등급",
    "리뷰내용",
    "등록일자",
  ];

  // [ reviewList 가져오기 ]
  useEffect(() => {
    dispatch(reviewAction.getReviewList({ ...searchQuery }));
  }, [query, dispatch]);

  console.log("reviewList", reviewList )
  console.log("reviewPage", totalPageNum)

  // [ 검색어나 페이지가 바뀌면 url바꿔주기 ]
  useEffect(() => {
    if(searchQuery === ""){
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    console.log("query:", query)
    navigate("?" + query);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({...searchQuery, page: selected +1});
  };

  // [ 검색 초기화 (All) ]
  const resetSearch = () => {
    setSearchQuery({
      page: 1,
      name: ""
    });
  };

  // [ 검색 핸들러 ]
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   setSearchQuery({
  //     ...searchQuery,
  //     name: formData.get("name"),
  //     ticketSeqTitle: formData.get("ticket.SeqTitle"),
  //   });
  // };

  // [ 회원 정보 수정 form 열기 ]
  const openEditForm = (review) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_REVIEW, payload: review });
  };

  return(
      <div className='admin_review_container'>
        <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="회원명이나 공연명으로 검색해주세요"
            field="name"
        />

        <Button onClick={resetSearch} variant="secondary">All</Button>

        <LinedTitle title='리뷰관리' cap='회원들이 남긴 리뷰를 조회하고 리뷰의 상태를 수정할 수 있습니다'/>

        <ReviewTable
            header={tableHeader}
            reviewList={reviewList}
            openEditForm={openEditForm}
        />

        <Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />
      </div>
  );
}

export default AdminReviewPage;