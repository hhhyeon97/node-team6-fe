import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../style/navbar.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const menuList = [
    "콘서트/뮤지컬",
    "연극",
    "무용",
    "미술",
    "기타"
  ]

  const getPage = () => {

  }

  return (
    <div>
      <Container className='nav-style'>
        <Row className='nav-header-box'>
            <Col xs={12} md={4}>
              <span className='site-name'>눈나<span className='site-name-color'>티켓</span></span>
            </Col>
            <Col xs={12} md={8}>
              {/* {서치박스어디에넣나} */}
              <div className='nav-user-box'>
                
                {/* 마이페이지 */}
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>

                {/* 찜 */}
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                </div>

                {/* 로그인/아웃 */}
                <div>
                  <FontAwesomeIcon icon={faDoorOpen} />
                </div>
              </div>
            </Col>
        </Row>
        <Row>
          <ul className='nav-menu-box'>
            {menuList.map((menu,index)=>(
              <li key={index}>
                <button onClick={()=>getPage()}>
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </Row>
      </Container>
    </div>
  )
}

export default Navbar
