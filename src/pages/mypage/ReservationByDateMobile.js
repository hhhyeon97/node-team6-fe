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
import '../../style/css/MyReserveDate.css'
// import '../../style/css/MyReservationByDate.css'
import LinedTitle from '../../component/LinedTitle';


// 예약날짜로 나의 예매 조회 컴포넌트
const ReservationByDateMobile = () => {
	const dispatch = useDispatch();
	const { reservationByDateList } = useSelector(state => state.reservation)
	const [selectDate, setSelectDate] = useState(new Date())
	const [showDialog, setShowDialog] = useState(false);
	const [mode, setMode] = useState("new");
	const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);

	useEffect(() => {
		const formatDate = selectDate.toString()
		dispatch(reservationAction.getMyReserveByDate({ formatDate }))

		// 이벤트 리스너 등록
		window.addEventListener('resize', handleResize);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [selectDate, dispatch])

	const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

	useEffect(() => {
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
		<>
		{isMobile ? (
			<Container className='wrap-container mypage-wrap-container mobile_page_container'>
				<LinedTitle title={"나의 예매"} cap={"관람일자로 조회"}/>
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
								<div className='no_reserve_msg'>
									<h4>해당 날짜에 예매내역이 없습니다.</h4>
									<button onClick={() => backToday()} className="todayButton">오늘날짜로 돌아가기</button>
								</div>
							)}
						</Col>
				</Row>
			</Container>
		):(
				<MyPageLayout title="나의 예매" cap="관람일자로 조회">
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
								<div className='no_reserve_msg'>
									<h4>해당 날짜에 예매내역이 없습니다.</h4>
									<button onClick={() => backToday()} className="todayButton">오늘날짜로 돌아가기</button>
								</div>
							)}
						</Col>
				</Row>
			</MyPageLayout>
		)}
	</>
	)
}

export default ReservationByDateMobile;