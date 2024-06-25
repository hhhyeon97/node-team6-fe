import React from 'react'
import MyPageLayout from '../../Layout/MyPageLayout'
import { useSelector } from 'react-redux'
import MyLikeCard from '../../component/mypage/MyLikeCard';

const MyLike = () => {
    const { likeList } = useSelector(state=>state.like);
  return (
    <MyPageLayout title="나의 활동" cap="나의 찜">
        <div>나의 찜 페이지</div>
        {likeList && likeList.length>0? likeList.map((item,index)=>(
            <MyLikeCard key={index} item={item} />
        )):''}
    </MyPageLayout>
  )
}

export default MyLike
