import React, { useEffect, useState } from 'react'
import { perfomanceListAction } from '../../action/perfomanceListAction'
import PerformanceCard from './PerformanceCard'
import { useDispatch, useSelector } from 'react-redux'
import { EndDateformat, StringDateformat } from '../../utils/Date'

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const MonthPerformance = () => {
    const dispatch = useDispatch();
    const [selectDate,setSelectDate] = useState(new Date());
    const [errorMsg, setErrorMsg] = useState();
    const [status, setStatus] = useState('02');
    const [showPage, setShowPage] = useState(1)
    
    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
        rows: 15,
        signgucode: '',
        prfstate: status,
    }

    useEffect(()=>{
        dispatch(perfomanceListAction.getPerformanceList({
            stdate: StringDateformat(selectDate),
            shcate: '',
            eddate: EndDateformat(selectDate),
            cpage: showPage
        }, settingQuery))
        console.log("receive PerformanceListData: ", PerformanceListData)
    },[selectDate])

    const { PerformanceListData, loading, error } = useSelector(state => state.list);

  return (
    <div className='month_performance_area'>
      <h2>이달의 공연</h2>
      <div className='month_performance_row'>
        {loading?(<div>공연 정보를 가져오는 중입니다 ...</div>)
        :(PerformanceListData && PerformanceListData.length > 0 ?
            PerformanceListData.map((item,index)=>{
                if(index>=5){return}else{
                    return(<PerformanceCard key={index} item={item}/>)
                }
            }):(<div>공연 정보가 없습니다!</div>))}
      </div>
      
    </div>
  )
}

export default MonthPerformance
