import React, { useEffect, useState } from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import CalenderBox from '../../component/CalenderBox';
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dateformat, StringDateformat, EndDateformat } from '../../utils/Date'
import { reservationAction } from "../../action/reservationAction";
import ReservationItem from "../../component/ReservationItem";

// 예약날짜로 나의 예매 조회 컴포넌트
const ReservationByDate = () => {
	const dispatch = useDispatch();
	const { reservationByDateList } = useSelector(state => state.reservation)
	const [selectDate, setSelectDate] = useState(new Date())

	useEffect(() => {
		const formatDate = selectDate.toString()
		dispatch(reservationAction.getMyReserveByDate({ formatDate }))
		console.log('prev reservationByDateList', reservationByDateList)
	}, [selectDate, dispatch])

	useEffect(() => {
		console.log('next reservationByDateList', reservationByDateList)
	}, [reservationByDateList])

	// [ 오늘날짜로 돌아가기]
	const backToday = () => {
		setSelectDate(new Date())
	}

	return (
		<MyPageLayout title="나의 예매" cap="예약날짜로 조회">
			<div>예약날짜로 나의 예매 조회 페이지</div>
			<Row>
				<Col lg={5} md={5} sm={6} className="CalenderBox">
					<div className="stickyBox">
						{selectDate ? <div className="selectDate">선택 날짜: {Dateformat(selectDate)} </div> :
							<div className="selectDate"> 선택 날짜: {Dateformat(new Date())} </div>}
						<CalenderBox selectDate={selectDate} setSelectDate={setSelectDate} />
						<div className="todayBTNBox">
							<button onClick={() => backToday()} className="todayButton">오늘로</button>
						</div>
					</div>
				</Col>
				<Col lg={6} md={6} sm={6}>
					{reservationByDateList && reservationByDateList.length > 0 ? (
						reservationByDateList.map(item => (
							<ReservationItem item={item} />
						))
					) : (
						<div>해당 날짜에 예매 내역이 없습니다.</div>
					)}
				</Col>
			</Row>
		</MyPageLayout>
	)
}

export default ReservationByDate;