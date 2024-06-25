import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { StartDate, EndDate } from '../../utils/MainCartDate'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { likeAction } from '../../action/likeAction'

const RankingCard = ({item,key}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imgUrL = 'http://www.kopis.or.kr/';
    const { likeList } = useSelector(state=>state.like);
    const checkLike = likeList.find(like=>like.seqId === item.mt20id);
    const sliceOpenDate = (date) => {
        const [openDate, closeDate] = date.split('~');
        return openDate
    }
    const sliceClosenDate = (date) => {
        const [openDate, closeDate] = date.split('~');
        return closeDate
    }

    const addLike = (item) => {
        dispatch(likeAction.addLikeToList({
            seqId:item.mt20id,
            seqImage:`${imgUrL}${item.poster}`,
            seqTo:sliceClosenDate(item.prfpd),
            seqFrom:sliceOpenDate(item.prfpd),
            seqLocation:item.prfplcnm,
            seqTitle:item.prfnm,
          }))        
    }
    const deleteLike = (item) => {
        dispatch(likeAction.deleteLikeItem({id:checkLike._id}));
    }

  return (
    <div key={key} className='performance_card_area'>
        <div className='performance_card_img_box' onClick={()=>navigate(`/performance/${item.mt20id}`)}>
            <img src={`${imgUrL}${item.poster}`} className='performance_card_img'/>
            <div className='ranking_num'>{item.rnum}</div>
        </div>
        <div onClick={()=>navigate(`/performance/${item.mt20id}`)}>
            <h3>{item.prfnm}</h3>
            <h4>{item.prfplcnm}</h4>
            <h5>{StartDate(sliceOpenDate(item.prfpd))} ~ {EndDate(sliceClosenDate(item.prfpd))}</h5>
        </div>
        {checkLike?(<div className='like_heart_red' onClick={()=>deleteLike(item)}><FontAwesomeIcon icon={fas.faHeart} /></div>)
        :(<div className='like-heart' onClick={()=>addLike(item)}><FontAwesomeIcon icon={faHeart} /></div>)}
        
    </div>
  )
}

export default RankingCard
