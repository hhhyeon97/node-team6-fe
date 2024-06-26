import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reservationAction } from '../../action/reservationAction';
import "../../style/css/Mypage.css";

const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id)
  // const { reserveList } = useSelector(state => state.reservation);

  useEffect(() => {
    dispatch(reservationAction.getReservationDetail(id));
  }, [id])

  return(
    <Container className="wrap-container">
      <h1>예매상세내역</h1>
      <Row>
        <Col>

            <div className="myorder-detail-container">
              <section className="my-order">
                <h3>주문상세내역</h3>
                <ul className='order-info'>
                  <li>주문일자 <strong></strong></li>
                  <li>주문번호 <strong></strong></li>
                </ul>
      

              </section>
              
              <section className="my-product">
                <h3>주문상품정보</h3>
                <ul className='my-prodcut-item-list'>   
                  <li className='my-product-itme-header'>
                    <div>상품정보</div>
                    <div>가격</div>
                    <div>수량</div>
                  </li>            
                  
                  {/* <li className='my-product-item' key={item._id} onClick={() => navigate(`/product/${item.productId._id}`)}> */}
                  <li className='my-product-item'>
                    <div>
                      <div className='product-info-left'>
                        {/* <img
                          src={item.productId.image}
                          alt="orderImage"
                          height={96}
                        /> */}
                      </div>
                    </div>
                    {/* <div>₩ {currencyFormat(item.price)}</div> */}
                    {/* <div>수량 {item.qty} 개</div> */}
                  </li>
                </ul>
              </section>

              <section className="my-buyer">
                <h3>구매자정보</h3>
                <div className='my-buyer-info'>
                  <div className='buyer-info buyer-name'>
                    <div>주문자</div>
                    {/* <div>{orderItem.userId.name}</div> */}
                  </div>
                  <div className='buyer-info buyer-email'>
                    <div>이메일</div>
                    {/* <div>{orderItem.userId.email}</div> */}
                  </div>
                </div>
              </section>

              <section className='my-payment'>
                <h3>결제정보</h3>
                <div>
                  <div>결제금액</div>
                  {/* <h5>₩ {currencyFormat(orderItem.totalPrice)}</h5> */}
                </div>
              </section>

            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationDetail