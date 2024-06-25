import React from "react";
import { useEffect } from 'react';
import MyPageLayout from '../../Layout/MyPageLayout';
import { reservationAction } from '../../action/reservationAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


// 나의 예매 모두 보기 컴포넌트
const ViewAllReservations = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// [ 나의예매 정보 받아오기 ]
	useEffect(() => {
		dispatch(reservationAction.getMyReserve());
	}, [dispatch]);

    return (
        <MyPageLayout title="나의 예매" cap="전체 조회">
            <div>나의 예매 모두 조회 페이지</div>
        </MyPageLayout>
    )
}

export default ViewAllReservations;