import React from "react";
import { useEffect, useState } from 'react';
import MyPageLayout from '../../Layout/MyPageLayout';
import * as types from "../../constants/reservation.constants";
import { reservationAction } from '../../action/reservationAction';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';
import MyReserveList from '../../component/mypage/MyReserveList';
import Pagination from '../../component/Pagination';
import ReviewDialog from '../mypage/ReviewDialog';
import "../../style/css/MyReserveAll.css"


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

	// [ 나의예매 정보 받아오기 ]
	useEffect(() => {
		dispatch(reservationAction.getMyReserve({ ...searchQuery }));
	}, [query, dispatch]);

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

	)
}

export default ViewAllReservations;