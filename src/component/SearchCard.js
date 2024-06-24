import React from 'react'
import { Col } from 'react-bootstrap'
import { EndDate, StartDate } from '../utils/MainCartDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const SearchCard = ({item}) => {
  return (
    <Col lg={3}>
        <div className='search_card_area'>
            <div className='search_card_img_box'>
                <img src={item.poster} className='search_card_img'/>
            </div>
            <div className='search_card_text'>
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
