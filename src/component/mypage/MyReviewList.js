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