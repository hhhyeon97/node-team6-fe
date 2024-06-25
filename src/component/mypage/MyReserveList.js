import React from "react";
import { useNavigate } from 'react-router-dom';
import MyReserveCard from './MyReserveCard';
import { Button } from "react-bootstrap";

const MyReserveList = ({ reserveList, openReviewForm }) => {
  const navigate = useNavigate();
  return(
    <div>
      {reserveList?.map((item, index) => (
        <div>
          <MyReserveCard 
            item={item}
            onClick={() => navigate(`/performance/${item.ticket.SeqId}`)} 
          />
          {/* 리뷰쓰기 버튼 */}
          <Button size="sm" onClick={() => openReviewForm(item)}>
            리뷰쓰기
          </Button>
          {/* 리뷰삭제 버튼 */}
          {/* <Button
            size="sm"
            variant="danger"
            onClick={() => deleteItem(item._id, item.name)}
            className="mr-1"
          >
            -
          </Button> */}
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;