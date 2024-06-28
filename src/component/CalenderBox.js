import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const CalenderBox = ({ selectDate, setSelectDate, blockDate, blockMaxDate, reservations }) => {
    const [activeStartDate, setActiveStartDate] = useState(selectDate);

    const formatDate = (date) => {
        return date.getDate(); // 날짜에서 일(Day)만 추출하여 숫자로 반환
    };

    const handleDateChange = (date) => {
        setSelectDate(date);
        setActiveStartDate(date);  // 선택된 날짜로 activeStartDate도 업데이트
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate);
    };

    // const getTileContent = ({ date, view }) => {
    //     if (view === 'month') {
    //         const reservation = reservations.find(res => new Date(res.date).toDateString() === date.toDateString());
    //         if (reservation) {
    //             return (
    //                 <div className="calendar-tile-content">
    //                     <img src={reservation.ticket.SeqImage} alt="예약 이미지" className="calendar-tile-image" />
    //                 </div>
    //             );
    //         }
    //     }
    //     return null;
    // };

    return (
        <Calendar
            key={selectDate.getTime()}
            onChange={handleDateChange}
            value={selectDate}
            formatDay={(locale, date) => formatDate(date, 'dd')}
            className="calender_custom"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            defaultView="month"
            minDetail="year"
            minDate={new Date(blockDate)}
            maxDate={blockMaxDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={handleActiveStartDateChange}
            // tileContent={getTileContent} // tileContent prop 추가
        >
        </Calendar >
    )

}

export default CalenderBox