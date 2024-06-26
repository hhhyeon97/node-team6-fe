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

  // useEffect(() => {
  //   reserveList.forEach(item => {
  //     dispatch(reviewAction.checkReviewed(item._id));
  //   });
  // }, [dispatch, reserveList]);

  const [reviewedReserves, setReviewedReserves] = useState({});
  const [isReviewed, setIsReviewed] = useState(false);

  // useEffect(() => {
  //   reserveList.forEach(async (item) => {
  //     console.log("reseve_id:", item._id)
  //   //   const response = await dispatch(reviewAction.checkReviewed(item._id));
  //   //   setReviewedReserves(prevState => ({
  //   //     ...prevState,
  //   //     [item._id]: response.data 
  //   //   }));
  //   // });
  // }, [dispatch, reserveList])}

  //   useEffect(() => {
  //   reserveList.forEach(item => {
  //     dispatch(reviewAction.checkReviewed(item._id));
  //   });
  // }, [dispatch, reserveList]);

  useEffect(() => {
    reserveList?.forEach(async (item) => {
      dispatch(reviewAction.checkReviewed(item.ticket.SeqTitle, item._id));
    })
  }, [reserveList]) 
  reserveList?.forEach(async (item) => {
    console.log(item.ticket.SeqTitle,"의 리뷰는", reviewedReserve)

  })
  
  // if(reviewedReserve){
  //   setIsReviewed(true)
  // }
  return(
    <div>
      {reserveList?.map((item, index) => (
        <div>
                <div>{item.ticket.SeqTitle}의 리뷰는 {reviewedReserve ? (<p>리뷰됨</p>) : (<p>리뷰안됨</p>)}</div>

          <MyReserveCard 
            item={item}
            openReviewForm={openReviewForm}
            reviewedReserve={isReviewed}
          />
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;