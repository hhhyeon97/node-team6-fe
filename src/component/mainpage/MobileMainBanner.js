import React from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const MobileMainBanner = () => {
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
    <div className='mobile_banner_area'>
      <Slider {...settings} >
      <div className='slide-img_box' onClick={()=>navigate('/performance/PF241368')}>
            <img
              src='http://www.kopis.or.kr/upload/pfmPoster/PF_PF241368_240520_135016.jpg'
              className=''/>
          </div>
          <div className='slide-img_box' onClick={()=>navigate('performance/PF239123')}>
            <img
              src='http://www.kopis.or.kr/upload/pfmPoster/PF_PF239123_240412_145134.jpg'
              className=''
              />
          </div>
      </Slider>
    </div>
  )
}

export default MobileMainBanner
