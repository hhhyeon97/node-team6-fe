import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { EndDate, StartDate } from '../utils/MainCartDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { likeAction } from '../action/likeAction';
import { fas } from '@fortawesome/free-solid-svg-icons';

const SearchCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { likeList } = useSelector(state=>state.like);
  const checkLike = likeList.find(like=>like.seqId === item.mt20id);

  const addLike = (item) => {
    dispatch(likeAction.addLikeToList({
      seqId:item.mt20id,
      seqImage:item.poster,
      seqTo:item.prfpdto,
      seqFrom:item.prfpdfrom,
      seqLocation:item.fcltynm,
      seqTitle:item.prfnm,
    }))
  }

  const deleteLike = (item) => {
    dispatch(likeAction.deleteLikeItem({id:checkLike._id}));
  }

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
            {checkLike?(<div className='like-heart-red' onClick={()=>deleteLike(item)}><FontAwesomeIcon icon={fas.faHeart} /></div>):(
            <div className='like-heart' onClick={()=>addLike(item)}><FontAwesomeIcon icon={far.faHeart} /></div>  
            )}
        </div>
    </Col>
  )
}

export default SearchCard
