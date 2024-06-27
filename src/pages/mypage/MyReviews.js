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
	// const mode = "edit"
  const [mode, setMode] = useState("edit");

	useEffect(() => {
			dispatch(reviewAction.getMyReview())
	}, [])

	useEffect(() => {
			console.log('myreviewpage', myReviewList)
	}, [myReviewList])

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

	// [ 상품 수정하기 form 열기 ] 
	const openReviewForm = (review) => {
		console.log("open")
		dispatch({type: types.SET_SELECTED_REVIEW, payload: review });
		setShowDialog(true);
	};

	// [ 이미지 깨질때 ]
	const handleImageError = (event) => {
			event.target.style.display = 'none';
	};

  return (
		<MyPageLayout title="나의 활동" cap="나의 리뷰">
			<div className='my_review_all_container'>
				<MyReviewList 
					mode={mode}
					myReviewList={myReviewList} 
					openReviewForm={openReviewForm}
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
		// <MyPageLayout title="나의 활동" cap="나의 리뷰">
		// 	<div>
		// 		{
		// 			myReviewList.map(review => (
		// 				!review.isSuspended ? (
		// 					<div style={{ border: 'solid 1px red', marginBottom: '10px' }}>
		// 								<div>
		// 										<div>
		// 												<div>
		// 														<div className='poster_box' onClick={()=>navigate(`/performance/${review.ticket.SeqId}`)} >
		// 																<img
		// 																		className='poster_img'
		// 																		src={review.image}
		// 																		style={{ width: '6em' }}
		// 																		alt='리뷰사진'
		// 																		onError={handleImageError}
		// 																		/>
		// 														</div>
		// 														<Star startNum={review.starRate} />
		// 														<div>{review.SeqTitle}</div>
		// 												</div>
		// 										</div>
		// 										<div>{convertToKST(review.createdAt)}</div>
		// 								</div>
		// 								<div>{review.reviewText}</div>
		// 					</div>
		// 				):(
		// 						<div>부적절한 내용으로 숨김처리됨 리뷰입니다. 자세한 사항은 1:1문의를 이용해주세요</div>
		// 				)
		// 			))
		// 		}
		// 	</div>
		// </MyPageLayout>
  )
}

export default MyReviews;