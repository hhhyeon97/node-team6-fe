import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { StartDate, EndDate } from '../../utils/MainCartDate'
import { useNavigate } from 'react-router-dom'

const RankingCard = ({item,key}) => {
    const navigate = useNavigate();
    const imgUrL = 'http://www.kopis.or.kr/';
    const sliceOpenDate = (date) => {
        const [openDate, closeDate] = date.split('~');
        return openDate
    }
    const sliceClosenDate = (date) => {
        const [openDate, closeDate] = date.split('~');
        return closeDate
    }

  return (
    <div key={key} className='performance_card_area' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
        <div className='performance_card_img_box'>
            <img src={`${imgUrL}${item.poster}`} className='performance_card_img'/>
            <div className='ranking_num'>{item.rnum}</div>
        </div>
        <div>
            <h3>{item.prfnm}</h3>
            <h4>{item.prfplcnm}</h4>
            <h5>{StartDate(sliceOpenDate(item.prfpd))} ~ {EndDate(sliceClosenDate(item.prfpd))}</h5>
        </div>
        <div className='like-heart'><FontAwesomeIcon icon={faHeart} /></div>
    </div>
  )
}

export default RankingCard
