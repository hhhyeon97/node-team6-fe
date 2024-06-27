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
  // const { reviewedReserve, reviewList,  loading } = useSelector((state) => state.review);
  const { reviewList,  loading } = useSelector((state) => state.review);
  
  // // [ 각 예약 항목에 대해 리뷰 여부 확인 ]
  // useEffect(() => {
  //   reserveList?.forEach((item) => {
  //     dispatch(reviewAction.checkReviewed(item.ticket.SeqTitle, item._id));
  //   });
  // }, [dispatch, reserveList]);
  

  // console.log("isReviewed?",reviewedReserve)

  return (
    <div>
    {reserveList?.map((item) => (
      <div key={item._id}>
        <div>{item.ticket.SeqTitle}의 리뷰는 
        {item.ticket.isReview ? (<p>리뷰됨</p>) : (<p>리뷰안됨</p>)}
      </div>

        <MyReserveCard
          item={item}
          openReviewForm={openReviewForm}
          isReviewed={item.ticket.isReview} 
        />
      </div>
    ))}
    </div>
  );


  // return(
  //   <div>
  //     {reserveList?.map((item, index) => (
  //       <div key={item._id}>
  //         <div>{item.ticket.SeqTitle}의 리뷰는 {reviewedReserve[item._id] ? (<p>리뷰됨</p>) : (<p>리뷰안됨</p>)}</div>

  //         <MyReserveCard 
  //           item={item}
  //           openReviewForm={openReviewForm}
  //           // reviewList={reviewList}
  //           isReviewed={reviewedReserve[item._id]}
  //         />
  //         {/* {!reviewedReserve[item._id] ? (
  //           <Button size="sm" onClick={() => openReviewForm(item)}>
  //             리뷰쓰기
  //           </Button>
  //         ) : (
  //           <p>이미 씀</p>
  //         )} */}
  //       </div>
  //     ))}
  //   </div>
  // )
}

export default MyReserveList;