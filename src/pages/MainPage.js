import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MonthPerformance from '../component/mainpage/MonthPerformance';
import '../style/css/MainPage.css';
import PlannedPerformance from '../component/mainpage/PlannedPerformance';
import ClosingPerformance from '../component/mainpage/ClosingPerformance';
import EventBanner from '../component/mainpage/EventBanner';
import RankingPerformance from '../component/mainpage/RankingPerformance';
import MainBanner from '../component/mainpage/MainBanner';
import { useDispatch } from 'react-redux';
import { likeAction } from '../action/likeAction';
import { perfomanceListAction } from '../action/perfomanceListAction';
import Review from '../component/mainpage/Review';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(likeAction.getLikeList());
    dispatch(perfomanceListAction.removeDetailData())
  }, [])
  return (
    <div>
      {/* <MainBanner />
      <Container className='wrap-container'>
        <RankingPerformance />
      </Container>
      <Container className='wrap-container'>
        <MonthPerformance />
      </Container>
      <PlannedPerformance />
      <Container className='wrap-container'>
        <ClosingPerformance />
      </Container> */}
      <EventBanner />
      <Container className='wrap-container'>
        <Review />  
      </Container>
    </div>

  );
};

export default MainPage;
