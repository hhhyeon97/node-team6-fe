import React, { useEffect, useState } from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import CalenderBox from '../../component/CalenderBox';
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dateformat, StringDateformat, EndDateformat } from '../../utils/Date'
import { reservationAction } from "../../action/reservationAction";
import ReservationItem from "../../component/ReservationItem";
import * as types from "../../constants/reservation.constants";
import MyReserveCard from '../../component/mypage/MyReserveCard';
import ReviewDialog from '../mypage/ReviewDialog';
// import '../../style/css/MyReservationByDate.css'


// 예약날짜로 나의 예매 조회 컴포넌트
const ReservationByDate = () => {
	const dispatch = useDispatch();
	const { reservationByDateList } = useSelector(state => state.reservation)
	const [selectDate, setSelectDate] = useState(new Date())
	const [showDialog, setShowDialog] = useState(false);
	const [mode, setMode] = useState("new");

	console.log("date", selectDate)

	useEffect(() => {
		const formatDate = selectDate.toString()
		console.log("formatDate", formatDate)
		dispatch(reservationAction.getMyReserveByDate({ formatDate }))
		console.log('prev reservationByDateList', reservationByDateList)
	}, [selectDate, dispatch])

	useEffect(() => {
		console.log('next reservationByDateList', reservationByDateList)
	}, [reservationByDateList])

	// [ 오늘날짜로 돌아가기 ]
	const backToday = () => {
		setSelectDate(new Date())
	}

	// [ 리뷰 작성하기 form 열기 ] 
	const openReviewForm = (reserve) => {
		dispatch({type: types.SET_SELECTED_RESERVATION, payload: reserve});
		setShowDialog(true);
	};

	return (
		<MyPageLayout title="나의 예매" cap="예약날짜로 조회">
			<Row className="my_reserve_date_container">
					<Col lg={5} md={5} sm={6} className="CalenderBox calander_section">
						<div className="stickyBox">
							{selectDate ? <div className="selectDate">선택 날짜: {Dateformat(selectDate)} </div> :
								<div className="selectDate"> 선택 날짜: {Dateformat(new Date())} </div>}
							<CalenderBox 
								selectDate={selectDate} 
								setSelectDate={setSelectDate} 
								reservations={reservationByDateList} // 예약 정보 전달
							/>
							<div className="todayBTNBox">
								<button onClick={() => backToday()} className="todayButton">오늘로</button>
							</div>
						</div>
					</Col>
					<Col lg={6} md={6} sm={6} className='card_section'>
						{reservationByDateList && reservationByDateList.length > 0 ? (
							reservationByDateList.map(item => (
								// <ReservationItem item={item} />
								<>
								<MyReserveCard
									item={item}
									openReviewForm={openReviewForm}
								/>
					
									<ReviewDialog
									mode={mode}
									showDialog={showDialog}
									setShowDialog={setShowDialog}
									// setSearchQuery={setSearchQuery}
									/>
								</>
							))
						) : (
							<div>해당 날짜에 예매 내역이 없습니다.</div>
						)}
					</Col>

			{/* <div>예약날짜로 나의 예매 조회 페이지</div> */}
{/* // 			<Row className="Info">
// 				<Col lg={7} md={7} sm={10}>
// 					{reservationByDateList && reservationByDateList.length > 0 ? (
// 						reservationByDateList.map(item => (
// 							<ReservationItem item={item} />
// 						))
// 					) : (
// 						<div>해당 날짜에 예매 내역이 없습니다.</div>
// 					)}
// 				</Col>
// 				<Col lg={5} md={5} sm={10} className="CalenderBox">
// 					<div className="stickyBox">
// 						{selectDate ? <div className="selectDate">선택 날짜: {Dateformat(selectDate)} </div> :
// 							<div className="selectDate"> 선택 날짜: {Dateformat(new Date())} </div>}
// 						<CalenderBox selectDate={selectDate} setSelectDate={setSelectDate} />
// 						<div className="todayBTNBox">
// 							<button onClick={() => backToday()} className="todayButton">오늘로</button>
// 						</div>
// 					</div>
// 				</Col> */}

			</Row>
		</MyPageLayout>
	)
}

export default ReservationByDate;