import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PerformanceCard from './PerformanceCard';
import { perfomanceListAction } from '../../action/perfomanceListAction';
import { EndDateformat, StringDateformat } from '../../utils/Date';
import { EndDate, StartDate } from '../../utils/MainCartDate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import PlannedCard from './PlannedCard';

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const PlannedPerformance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectDate,setSelectDate] = useState(new Date());
    const [errorMsg, setErrorMsg] = useState();
    const [status, setStatus] = useState('01');
    const [showPage, setShowPage] = useState(1);

    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
        rows: 9,
        signgucode: '',
        prfstate: status,
    }

    useEffect(()=>{
        dispatch(perfomanceListAction.getPerformanceListWithStatus({
            stdate: StringDateformat(selectDate),
            shcate: '',
            eddate: EndDateformat(selectDate),
            cpage: showPage
        }, settingQuery))
        console.log("오픈예정 ", PerformanceListDataWithStatus)

    },[selectDate])

    const { PerformanceListDataWithStatus, loading, error } = useSelector(state => state.list);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 7000,
        arrows: false,
        cssEase: "linear"
      };

  return (
    <div className='planned_performance'>
        <h2>오픈 예정 전시</h2>
        {loading?(<div>공연 정보를 가져오는 중입니다 ...</div>):
        PerformanceListDataWithStatus && PerformanceListDataWithStatus.length >0 ? (
            <div className="slider-container wrap-container planned_card_area">
                <Slider {...settings} className='slider'>
                    {PerformanceListDataWithStatus && PerformanceListDataWithStatus.length>0?
                    PerformanceListDataWithStatus.map((item,index)=>(
                        <PlannedCard key={index} item={item}/>
                    )):''}
                </Slider>
            </div>    
        ):(<div>공연 정보가 없습니다!</div>)
        }
        
    </div>
  )
}

export default PlannedPerformance
