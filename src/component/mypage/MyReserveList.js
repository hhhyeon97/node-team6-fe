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

  return (
    <div>
    {reserveList?.map((item) => (
      <div key={item._id}>
        <MyReserveCard
          item={item}
          openReviewForm={openReviewForm}
          isReviewed={item.ticket.isReview} 
        />
      </div>
    ))}
    </div>
  );
}

export default MyReserveList;