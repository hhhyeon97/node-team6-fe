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


  return (
    <div>
      { myReviewList.map(review => (
          !review.isSuspended ? (
            <div style={{ border: 'solid 1px red', marginBottom: '10px' }}>
              <div key={review._id}>
                <MyReviewCard
                  review={review}
                  openReviewForm={openReviewForm}
                />
              </div>
            </div>
          ):(
            <div style={{ border: 'solid 1px red', marginBottom: '10px' }}>부적절한 내용으로 숨김처리됨 리뷰입니다. 자세한 사항은 1:1문의를 이용해주세요</div>
          )
        ))
			}
    </div>
  )
}

export default MyReviewList;