import React, { useEffect, useState } from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import * as types from "../../constants/review.constants";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { reviewAction } from "../../action/reviewAction";
import Star from "../../component/Star";
import { convertToKST } from '../../utils/Date'
import { border } from "@cloudinary/url-gen/qualifiers/background";
import MyReviewList from '../../component/mypage/MyReviewList';
import ReviewDialog from '../../pages/mypage/ReviewDialog';
import { Col, Row, Container } from "react-bootstrap";
import LinedTitle from '../../component/LinedTitle';
import "../../style/css/MyReview.css";
import "../../style/css/MypageMobile.css";

// 나의 리뷰 컴포넌트
const MyReviews = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const { myReviewList } = useSelector(state => state.review)
	const [showDialog, setShowDialog] = useState(false);
	const [query, setQuery] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState({
		page: query.get("page") || 1,
	});
	const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);

	// const mode = "edit"
	const [mode, setMode] = useState("edit");

	useEffect(() => {
		dispatch(reviewAction.getMyReview())
		// 이벤트 리스너 등록
		window.addEventListener('resize', handleResize);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch])

	const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

	// [ 페이지가 바뀌면 url바꿔주기 ]
	useEffect(() => {
		const params = new URLSearchParams(searchQuery);
		const query = params.toString();
		navigate("?" + query);
	}, [searchQuery]);

	// [ 쿼리에 페이지값 바꿔주기 ]
	const onPageChange = ({ selected }) => {
		setSearchQuery({ ...searchQuery, page: selected + 1 });
	};

	// [ 상품 수정하기 form 열기 ] 
	const openReviewForm = (review) => {
		console.log("open")
		dispatch({ type: types.SET_SELECTED_REVIEW, payload: review });
		setShowDialog(true);
	};

	// [ 이미지 깨질때 ]
	const handleImageError = (event) => {
		event.target.style.display = 'none';
	};

	return (
		<>
		{isMobile ? (
			<Container className='wrap-container mypage-wrap-container mobile_page_container'>
				<LinedTitle title={"나의활동"} cap={"나의리뷰"}/>
				<div className='my_review_all_container'>
					<MyReviewList
						mode={mode}
						myReviewList={myReviewList}
						openReviewForm={openReviewForm}
						isMobile={isMobile}
					/>
				</div>

				{/* <Pagination 
				totalPageNum={totalPageNum}
				forcePage={searchQuery.page-1}
				onPageChange={onPageChange}
				/>
					*/}
				<ReviewDialog
					mode={mode}
					showDialog={showDialog}
					setShowDialog={setShowDialog}
					setSearchQuery={setSearchQuery}
				/>
			</Container>
		):(
			<MyPageLayout title="나의 활동" cap="나의 리뷰">
				<div className='my_review_all_container'>
					<MyReviewList
						mode={mode}
						myReviewList={myReviewList}
						openReviewForm={openReviewForm}
						isMobile={isMobile}
					/>
				</div>

				{/* <Pagination 
				totalPageNum={totalPageNum}
				forcePage={searchQuery.page-1}
				onPageChange={onPageChange}
				/>
					*/}
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

export default MyReviews;