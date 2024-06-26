import { faGit, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style/css/Footer.css'

const Footer = () => {
  const navigate = useNavigate();
  const noona = '{;}'
  return (
    <div className='footer_area'>
      <div className='footer_size'>
        <Row className='under_line'>
          <div className='footer_link_box'>
            <div className='git_fe_button'><FontAwesomeIcon icon={faGithub} /></div>
            <div className='git_be_button'><FontAwesomeIcon icon={faGit} /></div>
            <div className='noona_button'>{noona}</div>
          </div>
        </Row>
        <Row className='under_line'>     
          <Col lg={8}>
          공지사항
          </Col>
          <Col lg={4}>
            <Row className='footer_nav_area'>
              <Col lg={3}>
                <h3>우리는</h3>
                <h4>팀원 소개</h4>
                <h4>동료 모집</h4>
              </Col>
              <Col lg={3}>
                <h3>나의 예매</h3>
                <h4 onClick={()=>navigate('/mypage/reservations/view-all?page=1')}>예매 내역</h4>
                <h4>취소 내역</h4>
                <h4 onClick={()=>navigate('/mypage/reviews')}>공연리뷰 내역</h4>
                <h4 onClick={()=>navigate('/mypage/like')}>찜 내역</h4>
              </Col>
              <Col lg={3}>
                <h3>나의 계정</h3>
                <h4 onClick={()=>navigate('/mypage/edit-profile')}>회원정보수정</h4>
                <h4>회원등급</h4>
              </Col>
              <Col lg={3}>
                <h3>도움말</h3>
                <h4>공지사항</h4>
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
