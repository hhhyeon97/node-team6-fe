import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { likeAction } from '../../action/likeAction'
import { StringDateformat } from '../../utils/Date'
import { DateToReturn, StartDate } from '../../utils/MainCartDate'

const MyLikeCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = parseInt(StringDateformat(new Date()));
  const startDay = parseInt(DateToReturn(item.seqFrom));
  const endDay = parseInt(DateToReturn(item.seqTo));
  let status = '';
  let style = '';
  let filterStyle = '';
  if(startDay <= today && today <= endDay) {
    status='공연중';
  }else if(startDay>today) {
    status='공연예정'; style='before_perf';
  }else if(today>endDay) {
    status='공연종료'; style='end_perf'; filterStyle='filter_gray';
  }

  const deleteLikeItem = (item) => {
    dispatch(likeAction.deleteLikeItem({id:item._id}));
  }

  return (
    <div className='mylike_card_area'>
      <div className='mylike_care_image_size' onClick={()=>navigate(`/performance/${item.seqId}`)}>
        <img
          src={item.seqImage}
          className={`mylike_card_image ${filterStyle}`}
        /> 
      </div>
      <div className='mylike_card_text_box' onClick={()=>navigate(`/performance/${item.seqId}`)}>
        <div>
          <h4>{StartDate(item.seqFrom)} ~ {StartDate(item.seqTo)}</h4>
          <h3>{item.seqTitle}</h3>
          <h5>{item.seqLocation}</h5>  
        </div>
        
        <button className={style}>{status}</button>
      </div>
      <div className='like_heart' onClick={()=>deleteLikeItem(item)}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  )
}

export default MyLikeCard
