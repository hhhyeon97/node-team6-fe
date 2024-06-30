import React, { useEffect, useState } from 'react'
import MyPageLayout from '../../Layout/MyPageLayout'
import { useDispatch, useSelector} from 'react-redux'
import MyLikeCard from '../../component/mypage/MyLikeCard';
import { likeAction } from '../../action/likeAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container } from "react-bootstrap";
import LinedTitle from '../../component/LinedTitle';
import '../../style/css/MypageMobile.css';

const MyLike = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { likeList } = useSelector(state=>state.like);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 480px)").matches);

  useEffect(()=>{
    dispatch(likeAction.getLikeList());

        // 이벤트 리스너 등록
  window.addEventListener('resize', handleResize);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener('resize', handleResize);
  };
  },[])

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 480px)").matches);
  };

  return (
    <>
    {isMobile ? (
      <Container className='wrap-container mypage-wrap-container mobile_page_container'>
        <LinedTitle title={"나의 활동"} cap={"나의 찜"}/>
        <div className='mylike_wrap'>
          {likeList && likeList.length>0? likeList.map((item,index)=>(
              <MyLikeCard key={index} item={item} />
          )):(
          <div className='mylike_none'>
            <h3><FontAwesomeIcon icon={far.faHeart} /></h3>
            <h4>나의 찜 목록이 비어있습니다</h4>
            <div><button onClick={()=>navigate('/performance')}>공연 둘러보기</button></div>
          </div>
          )}
        </div>
      </ Container>
    ):(
      <MyPageLayout title="나의 활동" cap="나의 찜">
        <div className='mylike_wrap'>
          {likeList && likeList.length>0? likeList.map((item,index)=>(
              <MyLikeCard key={index} item={item} />
          )):(
          <div className='mylike_none'>
            <h3><FontAwesomeIcon icon={far.faHeart} /></h3>
            <h4>나의 찜 목록이 비어있습니다</h4>
            <div><button onClick={()=>navigate('/performance')}>공연 둘러보기</button></div>
          </div>
          )}
      </div>
    </MyPageLayout>
    )}
  </>
  )
}

export default MyLike
