import React from "react";
import { useNavigate } from 'react-router-dom';
import MyReserveCard from './MyReserveCard';

const MyReserveList = ({ reserveList }) => {
  const navigate = useNavigate();
  return(
    <div>
      {reserveList?.map((item, index) => (
        <div>
          <MyReserveCard 
            item={item}
            onClick={() => navigate(`/performance/${item.ticket.SeqId}`)} 
          />
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;