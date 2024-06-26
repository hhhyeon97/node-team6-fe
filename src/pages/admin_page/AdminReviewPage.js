import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from '../../action/reviewAction';
import LinedTitle from '../../component/LinedTitle';

const AdminReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviewList, totalPageNum } = useSelector((state) => state.review);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

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
    navigate("?" + query);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({...searchQuery, page: selected +1});
  };

  return(
      <div className='admin_review_container'>
      <LinedTitle title='리뷰관리' cap='회원들이 남긴 리뷰를 조회하고 리뷰의 상태를 수정할 수 있습니다'/>

      </div>
  );
}

export default AdminReviewPage;