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

  if(reserveList || reserveList.length === 0){
    return(
      <div className='no_reserve_msg'>
        <h4>예매내역이 없습니다.</h4>
        <div class="link_btn_group">
          <button onClick={() => navigate('/performance')} className="link_btn">공연 예매하기</button>
        </div>
    </div>
    )
  }

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