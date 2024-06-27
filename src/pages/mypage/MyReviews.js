import React, { useEffect } from "react";
import MyPageLayout from '../../Layout/MyPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from "../../action/reviewAction";
import Star from "../../component/Star";
import { convertToKST } from '../../utils/Date'
import { border } from "@cloudinary/url-gen/qualifiers/background";

// 나의 리뷰 컴포넌트
const MyReviews = () => {
    const dispatch = useDispatch()

    const { myReviewList } = useSelector(state => state.review)

    useEffect(() => {
        dispatch(reviewAction.getMyReview())
    }, [])

    useEffect(() => {
        console.log('myreviewpage', myReviewList)
    }, [myReviewList])

    return (
        <MyPageLayout title="나의 활동" cap="나의 리뷰">
            <div>
                {
                    myReviewList.map(review => (
                        <div style={{ border: 'solid 1px red', marginBottom: '10px' }}>
                            <div>
                                <div>
                                    <div>
                                        <Star startNum={review.starRate} />
                                        <div>{review.SeqTitle}</div>
                                    </div>
                                </div>
                                <div>{convertToKST(review.createdAt)}</div>
                            </div>
                            <div>{review.reviewText}</div>
                        </div>
                    ))
                }
            </div>
        </MyPageLayout>
    )
}

export default MyReviews;