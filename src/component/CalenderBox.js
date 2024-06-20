import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const CalenderBox = ({ selectDate, setSelectDate }) => {

    const formatDate = (date) => {
        return date.getDate(); // 날짜에서 일(Day)만 추출하여 숫자로 반환
    };

    return (
        <Calendar
            onChange={setSelectDate}
            value={selectDate}
            formatDay={(locale, date) => formatDate(date, 'dd')}
            className="calender_custom"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
            defaultView="month"
            // maxDetail="month"
            minDetail="year"

            activeStartDate={
                selectDate === null ? undefined : selectDate
            }

            onActiveStartDateChange={({ selectDate }) =>
                setSelectDate(selectDate)
            }
        >

        </Calendar >
    )

}

export default CalenderBox