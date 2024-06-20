import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { perfomanceListAction } from "../action/perfomanceListAction";
import '../style/DetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const PerformanceDetail = () => {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [detailData, setDetailData] = useState()
    const [selectTicketNum, setSelectTicketNum] = useState(1)
    const { id } = useParams()

    const [view, setView] = useState(false);

    useEffect(() => {
        perfomanceListAction.getPerformanceDetail({ setLoading, setErrorMsg, id, setDetailData })
    }, [])

    useEffect(() => {
        console.log('detailData: ', detailData)
    }, [detailData])

    const ticketNumList = [1, 2, 3, 4, 5, 6, 7]

    function Dropdown() {

        return (
            <div className="liBox">
                {ticketNumList.map((num) => (
                    <li onClick={() => setSelectTicketNum(num)}>{num}</li>
                ))}
            </div>
        );
    }

    return (
        <Container>
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
                            <Row className="ticketNum">
                                <ul onClick={() => { setView(!view) }}>
                                    수량 {selectTicketNum} 개 {""}
                                    {view ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                                    {view && <Dropdown />}
                                </ul>
                            </Row>
                            <Row>
                                <button className="reserveBtn">예매하기</button>
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
                    </div>

                </div>
            ) : (<div>데이터 로딩 중</div>)}
        </Container>
    )
}

export default PerformanceDetail