import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EndDate, StartDate } from '../../utils/MainCartDate';
import { useDispatch, useSelector } from 'react-redux';
import { likeAction } from '../../action/likeAction';
import { fas } from '@fortawesome/free-solid-svg-icons';

const PlannedCard = ({item}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { likeList } = useSelector(state=>state.like);
    const checkLike = likeList.find(like=>like.seqId===item.mt20id);

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
    <div className='planned_card_box'>
        <div className='planned_card'>
            <div className='planned_card_img_box'>
                <img src={item.poster} className='planned_card_img' onClick={()=>navigate(`/performance/${item.mt20id}`)}/>
                {checkLike?(<div className='like_heart_red' onClick={()=>deleteLike(item)}><FontAwesomeIcon icon={fas.faHeart} /></div>)
                :(<div className='like-heart' onClick={()=>addLike(item)}><FontAwesomeIcon icon={far.faHeart} /></div>)}
            </div>
            <div className='planned_text_box' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
                <div>
                    <h3>{item.prfnm}</h3>
                    <h4>{item.fcltynm}</h4>  
                </div>
                <div>
                    <h5>{StartDate(item.prfpdfrom)} ~ {EndDate(item.prfpdto)}</h5>    
                </div>
            </div>    
        </div>
    </div>
  )
}

export default PlannedCard
