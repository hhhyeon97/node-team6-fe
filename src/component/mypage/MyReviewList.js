import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from '../../action/reviewAction';
import { Button } from "react-bootstrap";
import MyReviewCard from './MyReviewCard';

const MyReviewList = ({ myReviewList, openReviewForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { myReviewList,  loading } = useSelector((state) => state.review);

  if(!myReviewList || myReviewList.length === 0){
    return(
      <div className='no_review_msg'>
        <h4>작성한 리뷰가 없습니다.</h4>
        <div class="link_btn_group">
          <button onClick={() => navigate('/performance')} className="link_btn">공연 예매하기</button>
          <button onClick={() => navigate('/mypage/reservations/view-all')}className="link_btn">리뷰 작성하기</button>
        </div>
    </div>
    )
  }

  return (
    <>
      { myReviewList.map(review => (
          !review.isSuspended ? (
              <div key={review._id}>
                <MyReviewCard
                  review={review}
                  openReviewForm={openReviewForm}
                />
              </div>
          ):(
            <div key={review._id}>
                <MyReviewCard
                  review={review}
                  // openReviewForm={openReviewForm}
                />
            </div>
          )
        ))
			}
    </>
  )
}

export default MyReviewList;