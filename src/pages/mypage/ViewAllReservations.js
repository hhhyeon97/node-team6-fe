import React from "react";
import { useEffect } from 'react';
import MyPageLayout from '../../Layout/MyPageLayout';
import { reservationAction } from '../../action/reservationAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MyReserveList from '../../component/mypage/MyReserveList';


// 나의 예매 모두 보기 컴포넌트
const ViewAllReservations = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { reserveList } = useSelector((state) => state.reservation);

	// [ 나의예매 정보 받아오기 ]
	useEffect(() => {
		dispatch(reservationAction.getMyReserve());
	}, [dispatch]);

	  // [ user loading ]
		if (!reserveList) {
			return <div>Loading...</div>; // 또는 다른 적절한 로딩 표시
		}

	console.log('reserveList',reserveList)
    return (
        <MyPageLayout title="나의 예매" cap="전체 조회">
            <div className='my_reserve_all_container'>
							<MyReserveList reserveList={reserveList} />
						</div>
        </MyPageLayout>
    )
}

export default ViewAllReservations;