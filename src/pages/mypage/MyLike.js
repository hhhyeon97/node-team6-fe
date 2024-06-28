import React, { useEffect } from 'react'
import MyPageLayout from '../../Layout/MyPageLayout'
import { useDispatch, useSelector } from 'react-redux'
import MyLikeCard from '../../component/mypage/MyLikeCard';
import { likeAction } from '../../action/likeAction';

const MyLike = () => {
    const dispatch = useDispatch();
    const { likeList } = useSelector(state=>state.like);

    useEffect(()=>{
      dispatch(likeAction.getLikeList());
    },[])
  return (
    <MyPageLayout title="나의 활동" cap="나의 찜">
        <div className='mylike_wrap'>
          {likeList && likeList.length>0? likeList.map((item,index)=>(
              <MyLikeCard key={index} item={item} />
          )):''}
        </div>
    </MyPageLayout>
  )
}

export default MyLike
