import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { DateChangeToNum } from '../../utils/MainCartDate';
import PerformanceCard from './PerformanceCard';
import { StringDateformat } from '../../utils/Date';

const ClosingPerformance = () => {
    const { PerformanceListData, loading, error } = useSelector(state => state.list);
    const today = new Date();
    const closingList = [];
    if(PerformanceListData) {
        PerformanceListData.map((item)=>{
            if(item.prfpdto) {
                const refNum = DateChangeToNum(item.prfpdto)-StringDateformat(today)
                if(refNum<=14) {
                    closingList.push(item);
                }    
            }
        })
    }

  return (
    <div className='month_performance_area'>
      <h2>마감 임박 공연</h2>
      <div className='month_performance_row'>
        {loading?(<div>공연 정보를 가져오는 중입니다 ...</div>)
        :(closingList && closingList.length > 0 ?
            closingList.map((item,index)=>{
                if(index>=5){return}else{
                    return(<PerformanceCard key={index} item={item}/>)
                }
            }):(<div>공연 정보가 없습니다!</div>))}
      </div>
      
    </div>
  )
}

export default ClosingPerformance
