import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CalenderBox from '../component/CalenderBox';
import '../style/css/ReservationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { Dateformat, numformat, priceformat } from '../utils/Date'

const ReservationPage = () => {
    const { detailData } = useSelector(state => state.list)
    const { user } = useSelector(state => state.user)

    const [reservationDate, setReservationDate] = useState(new Date(detailData ? detailData.prfpdfrom : null))
    const [ticketNum, setTicketNum] = useState(1)
    const [view, setView] = useState(false);

    console.log('reservation page detailData:', detailData)
    console.log('reservation page user:', user)

    const ticketNumList = [1, 2, 3, 4, 5]

    function Dropdown() {
        return (
            <div className="liBox">
                {ticketNumList.map((num) => (
                    <li onClick={() => { setTicketNum(num) }}>{num} 개</li>
                ))}
            </div>
        );
    }

    console.log("reservationDate:", reservationDate)

    return (
        <Container className='wrap-container reservationPage'>
            {detailData ? (
                <Row className='ReservationContainer'>
                    <Col lg={6} md={6} sm={12}>
                        <div>
                            <div className='title'>관람일자 선택</div>
                            <CalenderBox selectDate={reservationDate} setSelectDate={setReservationDate} />
                        </div>
                        <div>
                            <div className='title'>결제정보</div>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={12} className='reservation_Info_Box'>
                        <div className='subTitle'>상품 정보</div>
                        <div className='Info_TopBox_performance under_line'>
                            <div className='poster_img'>
                                <img src={detailData.poster}></img>
                            </div>
                            <div className='Info_reservation_text'>
                                <div className='inner_title'>{detailData.prfnm}</div>
                                <div>{detailData.fcltynm}</div>
                                <div>{detailData.prfpdfrom} ~ {detailData.prfpdto}</div>
                                <Row>
                                    <Col lg={6} md={12} sm={12} className='ticketnumleft_box'>
                                        <div>{detailData.prfruntime}</div>
                                        <div>{detailData.pcseguidance}</div>
                                    </Col>
                                    <Col lg={5} md={12} sm={12} className='ticketnum_box'>
                                        <ul onClick={() => { setView(!view) }} className="NumDrop">
                                            {ticketNum} 개
                                            {view ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                            {view && <Dropdown />}
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='under_line'>
                            <div className='subTitle'>관람일자</div>
                            <div>{reservationDate ? Dateformat(reservationDate) : ''}</div>
                        </div>
                        <div className='under_line'>
                            <div className='subTitle'>결제금액</div>
                            <div className='detail_cost'>
                                <div>총 상품금액</div>
                                <div>{priceformat(numformat(detailData.pcseguidance) * ticketNum)}원</div>
                            </div>
                            {user.level === 'gold' ? (
                                <div className='detail_cost'>
                                    <div>GOLD 할인 혜택(10%)</div>
                                    <div className='discount'>-3,000원</div>
                                </div>
                            ) : ('')}
                        </div>
                        <div>
                            <div className='subTitle'>총 결제금액</div>
                            {user.level === 'gold' ? (
                                <div className='finallyCost'>{priceformat(numformat(detailData.pcseguidance) * ticketNum - 3000)}</div>
                            ) : (
                                <div className='finallyCost'>{priceformat(numformat(detailData.pcseguidance) * ticketNum)}</div>
                            )}
                        </div>
                        <button className='pay_button'>결제하기</button>
                    </Col>
                </Row>
            ) : (<div>데이터 준비중</div>)}
        </Container>
    );
};

export default ReservationPage;
