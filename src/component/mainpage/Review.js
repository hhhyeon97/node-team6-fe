import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reviewAction } from '../../action/reviewAction';
import { Container } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

const Review = () => {
    const dispatch = useDispatch();
    const { mainPageReview, loading } = useSelector(state=>state.review);

    const starRate = 5;
    const reviewQty = 4;

    useEffect(()=>{
        dispatch(reviewAction.getMainPageReview({starRate,reviewQty}))
    },[])
  return (
    <div className='review_area'>
        <h2>이달의 관람 후기</h2>
        <div className='review_box'>
            {loading?(<div>리뷰 정보를 가져오는 중입니다 ...</div>)
            :(mainPageReview && mainPageReview.length>0 ? mainPageReview.map((item, index)=>(
                <ReviewCard key={index} item={item} />
            )):'')}       
        </div>
    </div>
  )
}

export default Review
