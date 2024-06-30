import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const EventBanner = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state=>state.user);
  return (
    <div className='event_banner'>
      <h2>EVENT</h2>
      <h6>오직 <span>7/7</span>일까지 Noona Culture에 가입하시는 분들 모두 <span>Gold</span>등급!</h6>
      {user?(<button onClick={()=>navigate('/mypage')}>이벤트 확인</button>)
      :(<button onClick={()=>navigate('/register')}>이벤트 확인</button>)}
    </div>
  )
}

export default EventBanner
