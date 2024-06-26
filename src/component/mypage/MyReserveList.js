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
  const { loading } = useSelector((state) => state.review);
  // const [reviewedReserves, setReviewedReserves] = useState({});
  const [isReviewed, setIsReviewed] = useState(false);
  // const [reviewStatus, setReviewStatus] = useState({});

  // useEffect(() => {
  //   reserveList?.forEach(async (item) => {
  //     dispatch(reviewAction.checkReviewed(item.ticket.SeqTitle, item._id));
  //   })
  // }, [reserveList]) 

  useEffect(() => {
    // 각 예약 항목에 대해 리뷰 여부 확인
    reserveList?.forEach((item) => {
      dispatch(reviewAction.checkReviewed(item.ticket.SeqTitle, item._id));
      setIsReviewed(reviewedReserve[item._id]);
    });
  }, [dispatch, reserveList]);

  console.log("이거뭐야",reviewedReserve)

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 화면
  }
  return(
    <div>
      {reserveList?.map((item, index) => (
        <div>
        <div>{item.ticket.SeqTitle}의 리뷰는 {isReviewed ? (<p>리뷰됨</p>) : (<p>리뷰안됨</p>)}</div>

          <MyReserveCard 
            item={item}
            openReviewForm={openReviewForm}
            // isReviewed={reviewStatus[item._id]}
          />
      {!isReviewed ? (
        <Button size="sm" onClick={() => openReviewForm(item)}>
          리뷰쓰기
        </Button>
      ) : (
        <p>이미 씀</p>
      )}
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;