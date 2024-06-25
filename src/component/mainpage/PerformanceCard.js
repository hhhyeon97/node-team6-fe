import { faHeart, far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { StartDate, EndDate } from '../../utils/MainCartDate'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { likeAction } from '../../action/likeAction'

const PerformanceCard = ({item,key}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { likeList } = useSelector(state=>state.like);
    const checkLike = likeList.find(like=>like.seqId===item.mt20id);

    const addLike = (item) =>{
      dispatch(likeAction.addLikeToList({
        seqId:item.mt20id,
        seqImage:item.poster,
        seqTo:item.prfpdto,
        seqFrom:item.prfpdfrom,
        seqLocation:item.fcltynm,
        seqTitle:item.prfnm,
      }))
    }
    const deleteLikeItem = (item) => {
      dispatch(likeAction.deleteLikeItem({id:checkLike._id}))
    }

  return (
    <div key={key} className='performance_card_area'>
        <div className='performance_card_img_box' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
            <img src={item.poster} className='performance_card_img'/>
        </div>
        <div onClick={()=>navigate(`/performance/${item.mt20id}`)}>
            <h3>{item.prfnm}</h3>
            <h4>{item.fcltynm}</h4>
            <h5>{StartDate(item.prfpdfrom)} ~ {EndDate(item.prfpdto)}</h5>
        </div>
        {checkLike?(
          <div className='like_heart_red' onClick={()=>deleteLikeItem(item)}>
            <FontAwesomeIcon icon={fas.faHeart} />
          </div>
        ):(
          <div className='like-heart' onClick={()=>addLike(item)}>
            <FontAwesomeIcon icon={far.faHeart} />
          </div>)}
    </div>
  )
}

export default PerformanceCard
