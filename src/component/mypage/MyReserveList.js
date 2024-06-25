import React from "react";
import MyReserveCard from './MyReserveCard';

const MyReserveList = ({ reserveList }) => {
  return(
    <div>
      예매 리스트
      {reserveList?.map((item, index) => (
        <div>
          <MyReserveCard item={item}/>
        </div>
      ))}
    </div>
  )
}

export default MyReserveList;