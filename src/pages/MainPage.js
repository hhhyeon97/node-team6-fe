import React from 'react';
import { Container } from 'react-bootstrap';
import MonthPerformance from '../component/mainpage/MonthPerformance';
import '../style/css/MainPage.css';

const MainPage = () => {
  return (
    <Container className='wrap-container'>
      <MonthPerformance />
    </Container>
  );
};

export default MainPage;
