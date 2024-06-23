import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { StartDate, EndDate } from '../../utils/MainCartDate'
import { useNavigate } from 'react-router-dom'

const PerformanceCard = ({item,key}) => {
    const navigate = useNavigate()
  return (
    <div key={key} className='performance_card_area' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
        <div className='performance_card_img_box'>
            <img src={item.poster} className='performance_card_img'/>
        </div>
        <div>
            <h3>{item.prfnm}</h3>
            <h4>{item.fcltynm}</h4>
            <h5>{StartDate(item.prfpdfrom)} ~ {EndDate(item.prfpdto)}</h5>
        </div>
        <div className='like-heart'><FontAwesomeIcon icon={faHeart} /></div>
    </div>
  )
}

export default PerformanceCard
