import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from '../../action/reviewAction';
import { Button } from "react-bootstrap";
import MyReserveCard from './MyReserveCard';

const MyReserveList = ({ reserveList, openReviewForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviewedReserve } = useSelector((state) => state.review);

  useEffect(() => {
    reserveList.forEach(item => {
      dispatch(reviewAction.checkReviewed(item._id));
    });
  }, [dispatch, reserveList]);

  return(
    <div>
      {reserveList?.map((item, index) => (
        <div>
          <MyReserveCard 
            item={item}
            openReviewForm={openReviewForm}
            reviewed={reviewedReserve?.[item._id] ?? undefined}
          />
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;