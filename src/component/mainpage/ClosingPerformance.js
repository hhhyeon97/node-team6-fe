import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { DateChangeToNum } from '../../utils/MainCartDate';
import PerformanceCard from './PerformanceCard';
import { StringDateformat } from '../../utils/Date';
import MainPageSkelton from '../../pages/skeletion/MainPageSkelton';

const ClosingPerformance = () => {
  const scrollContainerRef = useRef(null);
  const { PerformanceListData, loading, error } = useSelector(state => state.list);
  const today = new Date();
  const closingList = [];
  if (PerformanceListData) {
    PerformanceListData.map((item) => {
      if (item.prfpdto) {
        const refNum = DateChangeToNum(item.prfpdto) - StringDateformat(today)
        if (refNum <= 14) {
          closingList.push(item);
        }
      }
    })
  }
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleWheel = (event) => {
        if (event.deltaY > 0) {
            scrollContainer.scrollLeft += 100;
        } else {
            scrollContainer.scrollLeft -= 100;
        }
        event.preventDefault();
    };
    scrollContainer.addEventListener('wheel', handleWheel);
    return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='month_performance_area'>
      <h2>마감 임박 공연</h2>
      <div className='scroll_box' ref={scrollContainerRef}>
        <div className='month_performance_row'>
          {loading ? (
            <MainPageSkelton num={5} />
          )
            : (closingList && closingList.length > 0 ?
              closingList.map((item, index) => {
                if (index >= 5) { return } else {
                  return (<PerformanceCard key={index} item={item} />)
                }
              }) : (<div>공연 정보가 없습니다!</div>))}
        </div>  
      </div>
    </div>
  )
}

export default ClosingPerformance
