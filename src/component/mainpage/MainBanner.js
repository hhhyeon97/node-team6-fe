import React from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const MainBanner = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 7000,
    cssEase: "linear",
  };

  return (
    <div className='main_banner_area'>
      <div className='slider-container'>
        <Slider {...settings} className='main_slider'>
          <div className='slide-img_box bg_blue' onClick={()=>navigate('/performance/PF241368')}>
            <img
              src='https://tickets.interpark.com/_next/image?url=http%3A%2F%2Fticketimage.interpark.com%2FTCMS3.0%2FNMain%2FBbannerPC%2F2405%2F240516093001_24006816.gif&w=3840&q=75'
              className=''/>
          </div>
          <div className='slide-img_box bg_gr' onClick={()=>navigate('performance/PF239123')}>
            <img
              src='https://tickets.interpark.com/_next/image?url=http%3A%2F%2Fticketimage.interpark.com%2FTCMS3.0%2FNMain%2FBbannerPC%2F2404%2F240416092927_24005266.gif&w=3840&q=75'
              className=''
              />
          </div>
        </Slider>  
      </div>
    </div>
  )
}

export default MainBanner
