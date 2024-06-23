import React, { useEffect, useState } from 'react'
import { perfomanceListAction } from '../../action/perfomanceListAction'
import PerformanceCard from './PerformanceCard'

const MonthPerformance = () => {
    const [selectDate,setSelectDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [performanceListData, setPerformanceListData] = useState([])
    const [errorMsg, setErrorMsg] = useState()

    useEffect(()=>{
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg, selectDate })
    },[selectDate])

    useEffect(() => {
        console.log("this month performance", performanceListData)
    }, [performanceListData])

  return (
    <div className='month_performance_area'>
      <h2>이달의 공연</h2>
      <div className='month_performance_row'>
        {loading?(<div>공연 정보를 가져오는 중입니다 ...</div>)
        :(performanceListData && performanceListData.length > 0 ?
            performanceListData.map((item,index)=>{
                if(index>=5){return}else{
                    return(<PerformanceCard key={index} item={item}/>)
                }
            }):(<div>공연 정보가 없습니다!</div>))}
      </div>
      
    </div>
  )
}

export default MonthPerformance
