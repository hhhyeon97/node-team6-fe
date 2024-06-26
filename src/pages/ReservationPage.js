import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CalenderBox from '../component/CalenderBox';
import '../style/css/ReservationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faDisplay, faL } from '@fortawesome/free-solid-svg-icons'
import { Dateformat, numformat, cc_expires_format, priceformat } from '../utils/Date'
import Cards from 'react-credit-cards-2';
import PaymentForm from '../component/PaymentForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { reservationAction } from '../action/reservationAction';

const ReservationPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { detailData } = useSelector(state => state.list)
    const { user } = useSelector(state => state.user)

    const [reservationDate, setReservationDate] = useState(new Date())
    const [ticketNum, setTicketNum] = useState(1)
    const [view, setView] = useState(false);
    const [blockDate, setBlockDate] = useState('')
    const blockMaxDate = new Date(detailData?.prfpdto)

    const [totalPrice, setTotalPrice] = useState(0)

    const location = useLocation();
    const { cost } = location.state || { cost: [] };
    const costAsString = String(cost); // cost를 문자열로 변환하여 저장

    console.log('reservation page detailData:', detailData)
    console.log('reservation page user:', user)

    const ticketNumList = [1, 2, 3, 4, 5]

    // 카드 정보
    const [cardValue, setCardValue] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    useEffect(() => {
        if (detailData && detailData.prfpdfrom) {
            const prfpdfromDate = new Date(detailData.prfpdfrom);
            const today = new Date();

            if (isNaN(prfpdfromDate)) {
                console.error("Invalid date format in detailData.prfpdfrom:", detailData.prfpdfrom);
                return;
            }

            if (prfpdfromDate < today) {
                setReservationDate(today);
                setBlockDate(today)
            } else {
                setReservationDate(prfpdfromDate);
                setBlockDate(prfpdfromDate)
            }
        }
    }, [detailData])

    useEffect(() => {
        if (detailData) {
            if (user.level === 'gold') {
                setTotalPrice(numformat(costAsString) * ticketNum - numformat(costAsString) * ticketNum * 0.1)
            } else {
                setTotalPrice(numformat(costAsString) * ticketNum)
            }
        }
    }, [ticketNum])

    const handlePaymentInfoChange = (event) => {
        const { name, value } = event.target;

        if (name === 'expiry') {
            let newValue = cc_expires_format(value)
            setCardValue({ ...cardValue, [name]: newValue });
            return
        }

        setCardValue({ ...cardValue, [name]: value });
    }

    const handleInputFocus = (e) => {
        setCardValue({ ...cardValue, focus: e.target.name })
    }

    function Dropdown() {
        return (
            <div className="liBox">
                {ticketNumList.map((num) => (
                    <li onClick={() => { setTicketNum(num) }}>{num} 개</li>
                ))}
            </div>
        );
    }

    const handleReserve = () => {
        console.log('send reservationDate:', reservationDate)
        console.log('send cost', costAsString)

        const data = {
            totalPrice,
            ticketNum,
            reservationDate: reservationDate.toString(),
            SeqPrice: numformat(costAsString),

            ticket: {
                SeqId: detailData.mt20id,
                SeqImage: detailData.poster,
                SeqTitle: detailData.prfnm,
                SeqLocation: detailData.fcltynm,
                SeqFrom: detailData.prfpdfrom,
                SeqTo: detailData.prfpdto,
            }
        }

        dispatch(reservationAction.createReservation(data, navigate))
    }


    return (
        <Container className='wrap-container reservationPage'>
            {detailData ? (
                <Row className='ReservationContainer'>
                    <Col lg={7} md={6} sm={12} className='reservation_Right_Box'>
                        <div>
                            <div className='title'>관람일자 선택</div>
                            <CalenderBox selectDate={reservationDate} setSelectDate={setReservationDate} blockDate={blockDate} blockMaxDate={blockMaxDate} />
                        </div>
                        <div>
                            <div className='title'>결제정보</div>
                            <PaymentForm cardValue={cardValue} handleInputFocus={handleInputFocus} handlePaymentInfoChange={handlePaymentInfoChange} />
                        </div>
                    </Col>
                    <Col lg={5} md={6} sm={12} className='reservation_Info_Box'>
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
                                    <Col lg={7} md={12} sm={12} className='ticketnumleft_box'>
                                        <div>{detailData.prfruntime}</div>
                                        <div>{costAsString}</div>
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
                                <div>{priceformat(numformat(costAsString) * ticketNum)}원</div>
                            </div>
                            {user.level === 'gold' ? (
                                <div className='detail_cost'>
                                    <div>GOLD 할인 혜택(10%)</div>
                                    <div className='discount'>{priceformat(numformat(costAsString) * ticketNum * 0.1)}원</div>
                                </div>
                            ) : ('')}
                        </div>
                        <div>
                            <div className='subTitle'>총 결제금액</div>
                            {user.level === 'gold' ? (
                                <div className='finallyCost'>{priceformat(numformat(costAsString) * ticketNum - numformat(costAsString) * ticketNum * 0.1)}원</div>
                            ) : (
                                <div className='finallyCost'>{priceformat(numformat(costAsString) * ticketNum)}원</div>
                            )}
                        </div>
                        <button className='pay_button' onClick={handleReserve}>결제하기</button>
                    </Col>
                </Row>
            ) : (<div>데이터 준비중</div>)}
        </Container>
    );
};

export default ReservationPage;
