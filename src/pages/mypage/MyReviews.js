import React, { useEffect } from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { reviewAction } from "../../action/reviewAction";
import Star from "../../component/Star";
import { convertToKST } from '../../utils/Date'
import { border } from "@cloudinary/url-gen/qualifiers/background";

// 나의 리뷰 컴포넌트
const MyReviews = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { myReviewList } = useSelector(state => state.review)

    useEffect(() => {
        dispatch(reviewAction.getMyReview())
    }, [])

    useEffect(() => {
        console.log('myreviewpage', myReviewList)
    }, [myReviewList])

    // [ 이미지 깨질때 ]
    const handleImageError = (event) => {
        event.target.style.display = 'none';
    };

    return (
        <MyPageLayout title="나의 활동" cap="나의 리뷰">
            <div>
                {
                    myReviewList.map(review => (
                        !review.isSuspended ? (
                            <div style={{ border: 'solid 1px red', marginBottom: '10px' }}>
                            <div>
                                <div>
                                    <div>
                                        <div className='poster_box' onClick={()=>navigate(`/performance/${review.ticket.SeqId}`)} >
                                            <img
                                                className='poster_img'
                                                src={review.image}
                                                style={{ width: '6em' }}
                                                alt='리뷰사진'
                                                onError={handleImageError}
                                                />
                                        </div>
                                        <Star startNum={review.starRate} />
                                        <div>{review.SeqTitle}</div>
                                    </div>
                                </div>
                                <div>{convertToKST(review.createdAt)}</div>
                            </div>
                            <div>{review.reviewText}</div>
                        </div>
                        ):(
                            <div>부적절한 내용으로 숨김처리됨 리뷰입니다. 자세한 사항은 1:1문의를 이용해주세요</div>
                        )
                    ))
                }
            </div>
        </MyPageLayout>
    )
}

export default MyReviews;