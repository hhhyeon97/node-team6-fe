import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { perfomanceListAction } from "../action/perfomanceListAction";
import '../style/css/DetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import KaKaoMap from "../component/KaKaoMap";
import CopyClipButton from "../component/CopyClipButton";
import KakaoClipButton from "../component/KakaoClipButton";

const PerformanceDetail = () => {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [detailData, setDetailData] = useState()
    const [selectTicketNum, setSelectTicketNum] = useState(1)
    const { id } = useParams()

    const [view, setView] = useState(false);
    const [posterList, setPosterList] = useState([]);
    const [hidden, setHidden] = useState(true)
    const [location, setLocation] = useState('')

    const [lat, setLat] = useState()
    const [lot, setLot] = useState()

    const ticketNumList = [1, 2, 3, 4, 5, 6]

    useEffect(() => {
        perfomanceListAction.getPerformanceDetail({ setLoading, setErrorMsg, id, setDetailData })
    }, [])

    useEffect(() => {
        console.log('detailData: ', detailData)
        if (detailData) {
            setPosterList(detailData.styurls)
            setLocation(detailData.mt10id)
        }
    }, [detailData])

    useEffect(() => {
        perfomanceListAction.getLocationLatLot({ setLoading, setErrorMsg, location, setLat, setLot })
    }, [location])

    useEffect(() => {
        // console.log('setLat, setLot', lat, lot)
    }, [lat, lot])


    function Dropdown() {
        return (
            <div className="liBox">
                {ticketNumList.map((num) => (
                    <li onClick={() => setSelectTicketNum(num)}>{num}개</li>
                ))}
            </div>
        );
    }

    const showDetail = () => {
        setHidden(!hidden)
    }

    return (
        <Container className="wrap-container">
            {detailData ? (
                <div className="DetailPageAllBox">
                    <div className="DetailStatus">
                        <span>
                            {detailData.prfstate}
                        </span>
                    </div>
                    <div className="DetailTitle">{detailData.prfnm}</div>
                    <Row className="DetailTopBox">
                        <Col lg={4} md={4} sm={4} className="DetailTopImg">
                            <img src={detailData.poster} />
                        </Col>
                        <Col lg={7} md={7} sm={12} className="DetailInfoBox">
                            <Row className="LikeShare">
                                <FontAwesomeIcon icon={faHeart} />
                                <CopyClipButton detailData={detailData} />
                                {/* <KakaoClipButton detailData={detailData} /> */}
                            </Row>
                            <Row className="DetailInfo">
                                <Col lg={3} md={3} sm={3}>
                                    <div>장소</div>
                                    <div>공연기간</div>
                                    <div>공연 런타임</div>
                                    <div>관람 연령</div>
                                    <div>가격</div>
                                </Col>
                                <Col lg={9} md={9} sm={9}>
                                    <div>{detailData.fcltynm}</div>
                                    <div>{detailData.prfpdfrom} ~ {detailData.prfpdto}</div>
                                    <div>{detailData.prfruntime}</div>
                                    <div>{detailData.prfage}</div>
                                    <div>{detailData.pcseguidance}</div>
                                </Col>
                            </Row>
                            <Row className="DetailButtonBox">
                                <Col lg={3} md={3} sm={3} className="ticketNum">
                                    <ul onClick={() => { setView(!view) }}>
                                        수량 {selectTicketNum}개 {""}
                                        {view ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                        {view && <Dropdown />}
                                    </ul>
                                </Col>
                                <Col lg={8} md={8} sm={8} className="reservationBtnBox">
                                    <button className="reserveBtn">예매하기</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <div className="subTitle">티켓 유의사항</div>
                        <li>티켓은 별도 배송이 되지 않습니다.</li>
                        <li>현장에서 구매 및 본인 확인 티켓을 수령할 수 있습니다.</li>

                        <div className="subTitle">공연시간</div>
                        <li>{detailData.dtguidance}</li>

                        <div className="subTitle">캐스팅</div>
                        <li>{detailData.prfcast}</li>

                        <div className="subTitle">공연 상세</div>
                        <div className="DetailBox">
                            <div className="postersBox" id={hidden.toString()}>
                                <div className="posters">
                                    {posterList.length === 0 ? null : (
                                        Array.isArray(posterList.styurl) && posterList.styurl.length > 1 ? (
                                            posterList.styurl.map((item, index) => (
                                                <img key={index} src={item} alt={`poster-${index}`} />
                                            ))
                                        ) : (
                                            <img src={posterList.styurl} alt="poster" />
                                        )
                                    )}
                                </div>
                            </div>
                            <button className="detailHiddenBtn" id={hidden.toString() + 1} onClick={() => showDetail()}>공연 상세 더보기</button>
                        </div>
                        <div className="subTitle">위치 정보</div>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} size="xl" />{detailData.fcltynm}
                        </div>
                        {
                            lat && lot ? (<KaKaoMap lat={lat} lot={lot} />) : null
                        }
                    </div>

                </div>
            ) : (<div>데이터 로딩 중</div>)
            }
        </Container >
    )
}

export default PerformanceDetail