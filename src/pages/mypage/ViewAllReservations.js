import React from "react";
import { useEffect, useState } from 'react';
import MyPageLayout from '../../Layout/MyPageLayout';
import * as types from "../../constants/reservation.constants";
import { reservationAction } from '../../action/reservationAction';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Col, Row, Container } from "react-bootstrap";
import MyReserveList from '../../component/mypage/MyReserveList';
import Pagination from '../../component/Pagination';
import ReviewDialog from '../mypage/ReviewDialog';
import LinedTitle from '../../component/LinedTitle';
import "../../style/css/MyReserveAll.css"
import "../../style/css/MypageMobile.css";


// 나의 예매 모두 보기 컴포넌트
const ViewAllReservations = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { reserveList, totalPageNum } = useSelector((state) => state.reservation);
	const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);

	// [ 나의예매 정보 받아오기 ]
	useEffect(() => {
		dispatch(reservationAction.getMyReserve({ ...searchQuery }));

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
	}, [query, dispatch]);
  
  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

  // ----------------------------

	// console.log('reserveList',reserveList, totalPageNum)

  // [ 페이지가 바뀌면 url바꿔주기 ]
  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({...searchQuery, page: selected +1});
  };

  // [ 리뷰 작성하기 form 열기 ] 
  const openReviewForm = (reserve) => {
    dispatch({type: types.SET_SELECTED_RESERVATION, payload: reserve});
    setShowDialog(true);
  };


	return (
    <>
    {isMobile ? (
      <Container className='wrap-container mypage-wrap-container mobile_page_container'>
        <LinedTitle title={"나의예매"} cap={"전체조회"}/>

        <div className='my_reserve_all_container'>
          <MyReserveList 
            reserveList={reserveList} 
            openReviewForm={openReviewForm}
            isMobile={isMobile}
          />
        </div>

					<Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />

        <ReviewDialog
          mode={mode}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setSearchQuery={setSearchQuery}
        />
      </Container>  
    ):(
			<MyPageLayout title="나의 예매" cap="전체 조회">
					<div className='my_reserve_all_container'>
						<MyReserveList 
              reserveList={reserveList} 
              openReviewForm={openReviewForm}
            />
					</div>

					<Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />

        <ReviewDialog
          mode={mode}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          setSearchQuery={setSearchQuery}
        />
			</MyPageLayout>
    )}
  </>
	)
}

export default ViewAllReservations;