import React from 'react';
import { Container } from 'react-bootstrap';
import MonthPerformance from '../component/mainpage/MonthPerformance';
import '../style/css/MainPage.css';
import PlannedPerformance from '../component/mainpage/PlannedPerformance';
import ClosingPerformance from '../component/mainpage/ClosingPerformance';
import EventBanner from '../component/mainpage/EventBanner';

const MainPage = () => {
  return (
    <div>
      <Container className='wrap-container'>
        <MonthPerformance />
      </Container>
      <PlannedPerformance />
      <Container className='wrap-container'>
        <ClosingPerformance />
      </Container>
      <EventBanner />
    </div>
    
  );
};

export default MainPage;
