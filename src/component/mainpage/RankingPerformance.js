import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StringDateformat } from '../../utils/Date';
import { perfomanceListAction } from '../../action/perfomanceListAction';
import RankingCard from './RankingCard';

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const RankingPerformance = () => {
    const dispatch = useDispatch();
    const [selectDate,setSelectDate] = useState(new Date());
    const [errorMsg, setErrorMsg] = useState();
    const [catecode, setCatecode] = useState('GGGA');
    const [active,setActive] = useState(Array(6).fill(true,0,1).fill(false,1,6));

    const genreList = [
        { name: '뮤지컬', code: 'GGGA' },
        { name: '콘서트', code: 'CCCD' },
        { name: '클래식', code: 'CCCA' },
        { name: '국악', code: 'CCCC' },
        { name: '무용', code: 'BBBC' },
        { name: '연극', code: 'AAAA' },
    ]

    const getGenreRanking = (item,index) => {
        const newActive = active.map((clicked,i)=>(
            i === index ? true : false
        ))
        setActive(newActive);
        setCatecode(item.code);
    }
    
    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
        // rows: 5,
        ststype: 'week', //월별month 주별week 일별day
        date: StringDateformat(selectDate),
    }

    useEffect(()=>{
        dispatch(perfomanceListAction.getRankingPerformance({
            catecode: catecode,
        }, settingQuery))
    },[selectDate, catecode])

    const { RankingList, loading, error } = useSelector(state => state.list);
  return (
    <div className='month_performance_area'>
      <h2>장르별 TOP5</h2>
      <div className='genre_btn_area'>
        {genreList.map((item,index)=>(
            <button 
                key={index} 
                onClick={()=>getGenreRanking(item,index)}
                className={`${active[index]?'active':''}`}
            >{item.name}</button>
        ))}
      </div>
      <div className='month_performance_row'>
        {loading?(<div>공연 정보를 가져오는 중입니다 ...</div>)
        :(RankingList && RankingList.length > 0 ?
            RankingList.map((item,index)=>{
                if(index>=5){return}else{
                    return(<RankingCard key={index} item={item}/>)
                }
            }):(<div>공연 정보가 없습니다!</div>))}
      </div>
    </div>
  )
}

export default RankingPerformance
