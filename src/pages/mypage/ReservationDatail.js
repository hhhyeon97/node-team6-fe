import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reserveFormat } from '../../utils/Date';
import { priceformat } from '../../utils/Date';
import { convertToKST } from '../../utils/Date';
import { reservationAction } from '../../action/reservationAction';
import "../../style/css/Mypage.css"
import LoadingText from '../../component/LoadingText';
import AlertModal from '../../component/AlertModal';

const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id)
  const { selectedReserve, loading, error } = useSelector(state => state.reservation);
  const [showModal, setShowModal] = useState(false);
  const [cancelBtnClass, setCancelBtnClass] = useState('');

  useEffect(() => {
    dispatch(reservationAction.getReservationDetail(id));
  }, [id])


  // [ 관람 당일 이후거나 이미 예매취소했으면 예매취소 불가능 ]
  useEffect(() => {

    const reservationDate = new Date(selectedReserve?.reservationDate);
    const currentDate = new Date();

    if (reservationDate > currentDate && !selectedReserve.isCanceled) {
      setCancelBtnClass('okCancel');
    } else {
      setCancelBtnClass('disableCancel');
    }
  }, [selectedReserve]);

  // [ 예매 취소 ]
  const handleCancle = () => {
    setShowModal(true);
  }


  if (loading) {
    return <LoadingText />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!selectedReserve) {
    return <div>No reservation details found.</div>;
  }

  return(
    <Container className="wrap-container">
      <Row>
        <Col>
            <div className="reserve-detail-container">
            {selectedReserve.isCanceled ? (<h1>예매취소됨</h1>):(<h1>예매중</h1>)}
              
              <section className="my-order">
                <h3>예매상세내역</h3>
                <ul className='order-info'>
                  <li>예매번호 <strong>{selectedReserve.reservationId}</strong></li>
                  <li>예매일자 <strong>{convertToKST(selectedReserve.createdAt)}</strong></li>
                </ul>
              </section>
              
              <section className="my-product">
                <h3>예매상품정보</h3>
                <ul className='my_reserve_card_container'>   
                  <div className='poster_box' onClick={() => navigate(`/performance/${selectedReserve.ticket.SeqId}`)} >
                    <img
                      className='poster_img'
                      src={selectedReserve.ticket.SeqImage}
                      style={{ width: '8em' }}
                      alt='예약공연 포스터'
                      />
                  </div>         
                  <div className='card_title'><h5>{selectedReserve.ticket.SeqTitle}</h5></div>
                  <div><strong>{priceformat(selectedReserve.totalPrice)}원</strong> / 티켓수량 <strong>{selectedReserve.ticketNum}</strong></div>
                  <div className='info_item book_date'>
                    <p>관람일자</p>
                    <strong>{reserveFormat(selectedReserve.reservationDate)}</strong>
                  </div>
                </ul>

                <Button onClick={handleCancle} className={cancelBtnClass}>예매취소</Button>
                
              </section>

              <section className="my-buyer">
                <h3>구매자정보</h3>
                <div className='my-buyer-info'>
                  <div className='buyer-info buyer-name'>
                    <div>주문자</div>
                    <div>{selectedReserve.userId.name}</div>
                  </div>
                  <div className='buyer-info buyer-email'>
                    <div>이메일</div>
                    <div>{selectedReserve.userId.email}</div>
                  </div>
                  <div className='buyer-info buyer-email'>
                    <div>연락처</div>
                    <div>{selectedReserve.userId.contact}</div>
                  </div>
                </div>
              </section>

              <section className='my-payment'>
                <h3>결제정보</h3>
                <div>
                  <div>결제금액</div>
                  <h5>₩ { priceformat(selectedReserve.totalPrice)}원</h5>
                </div>
              </section>
            </div>

            <AlertModal 
              showModal={showModal}
              setShowModal={setShowModal}
              selectedId={id}
              selectedName={selectedReserve.ticket.SeqTitle}
              selectedDate={reserveFormat(selectedReserve.reservationDate)}
              alertMessage="해당 공연의 예매를 정말로 취소하시겠습니까?(예매취소는 관람일 하루 전날까지만 가능합니다)"
              btnText="예매취소"
            />
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationDetail