import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { EndDate, StartDate } from '../utils/MainCartDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const SearchCard = ({item}) => {
  const navigate = useNavigate();
  return (
    <Col lg={3}>
        <div className='search_card_area'>
            <div className='search_card_img_box' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
                <img src={item.poster} className='search_card_img'/>
            </div>
            <div className='search_card_text' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
                <h3>{item.prfnm}</h3>
                <h4>{item.fcltynm}</h4>
                <h5>{StartDate(item.prfpdfrom)} ~ {EndDate(item.prfpdto)}</h5>
            </div>
            <div className='like-heart'><FontAwesomeIcon icon={faHeart} /></div>    
        </div>
    </Col>
  )
}

export default SearchCard
