import { faGit, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style/css/Footer.css'
import { useDispatch, useSelector } from 'react-redux'
import { noticeAction } from '../action/noticeAction'

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = 4;
  const {mainNoticeList,loading,error} = useSelector(state=>state.notice);

  useEffect(()=>{
    dispatch(noticeAction.getMainNoticeList(size));
  },[])

  const noona = '{;}'
  return (
    <div className='footer_area'>
      <div className='footer_size'>
        <Row className='under_line'>
          <div className='footer_link_box'>
            <a className='git_fe_button' href='https://github.com/hhhyeon97/node-team6-fe' target='_blank'><FontAwesomeIcon icon={faGithub} /></a>
            <a className='git_be_button' href='https://github.com/hhhyeon97/node-team6-be' target='_blank'><FontAwesomeIcon icon={faGit} /></a>
            <a className='noona_button' href='https://codingnoona.thinkific.com/' target='_blank'>{noona}</a>
          </div>
        </Row>
        <Row className='under_line'>     
          <Col lg={8} className='footer_notice mobile_margin'>
            <h3>공지사항</h3>
            {loading?(<div>공지사항을 불러오는 중입니다.</div>)
            : mainNoticeList&&mainNoticeList.length>0? mainNoticeList.map((item, index)=>(
              <h4 key={index}><span onClick={()=>navigate('/notice')}>{item.title}</span></h4>
            )):''}
          </Col>
          <Col lg={4}>
            <Row className='footer_nav_area'>
              <Col xs={3} className='mobile_margin'>
                <h3>우리는</h3>
                <h4>팀원 소개</h4>
                <h4>동료 모집</h4>
              </Col>
              <Col xs={3} className='mobile_margin'>
                <h3>나의 예매</h3>
                <h4 onClick={()=>navigate('/mypage/reservations/view-all?page=1')}>예매 내역</h4>
                <h4>취소 내역</h4>
                <h4 onClick={()=>navigate('/mypage/reviews')}>공연리뷰 내역</h4>
                <h4 onClick={()=>navigate('/mypage/like')}>찜 내역</h4>
              </Col>
              <Col xs={3} className='mobile_margin'>
                <h3>나의 계정</h3>
                <h4 onClick={()=>navigate('/mypage/edit-profile')}>회원정보수정</h4>
                <h4>회원등급</h4>
              </Col>
              <Col xs={3} className='mobile_margin'>
                <h3>도움말</h3>
                <h4 onClick={()=>navigate('/notice')}>공지사항</h4>
                <h4>FAQ</h4>
                <h4>고객의 소리</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='footer_info_box'>
          <div>
            <h3><span>개인정보처리방침</span>|<span className='footer_info_link_front_blank'>이용약관</span></h3>
          </div>
          <div>
            <h4><span>상호명:누나컬쳐</span> <span>사업장소재지:서울</span></h4>
            <h4><span>대표이사:김민솔, 송이수, 정예진, 최주연</span></h4>
            <h4><span>Copyright ⓒ NoonaCulture All Rights Reserved.</span></h4>
            <h4><span>이 페이지는 영리 목적이 아닌 포트폴리오 용도로 제작되었음을 알려드립니다.</span></h4>
          </div>
        </Row>
      </div>
    </div>      
  )
}

export default Footer
