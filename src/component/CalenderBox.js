import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const CalenderBox = ({ selectDate, setSelectDate }) => {
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

    return (
        <Calendar
            onChange={handleDateChange}
            value={selectDate}
            formatDay={(locale, date) => formatDate(date, 'dd')}
            className="calender_custom"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            defaultView="month"
            minDetail="year"

            activeStartDate={activeStartDate}

            onActiveStartDateChange={handleActiveStartDateChange}
        >

        </Calendar >
    )

}

export default CalenderBox