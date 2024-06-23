import React from 'react';
import { Container } from 'react-bootstrap';
import MonthPerformance from '../component/mainpage/MonthPerformance';
import '../style/css/MainPage.css';

const MainPage = () => {
  return (
    <div>
      <Container className='wrap-container'>
        <MonthPerformance />
      </Container>
    </div>
    
  );
};

export default MainPage;
