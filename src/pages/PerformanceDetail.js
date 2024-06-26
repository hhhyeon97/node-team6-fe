import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { perfomanceListAction } from "../action/perfomanceListAction";
import '../style/css/DetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import KaKaoMap from "../component/KaKaoMap";
import CopyClipButton from "../component/CopyClipButton";
import { useDispatch, useSelector } from "react-redux";
import LoadingText from "../component/LoadingText"
import { reviewAction } from "../action/reviewAction";
import { convertToKST } from '../utils/Date'

import KakaoClipButton from "../component/KakaoClipButton";
import Star from "../component/Star";

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const PerformanceDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.list)
    const { error } = useSelector(state => state.list)

    const { detailData } = useSelector(state => state.list)
    const { reviewAllList } = useSelector(state => state.review)

    const [selectTicketNum, setSelectTicketNum] = useState(1)
    const { id } = useParams()

    const [view, setView] = useState(false);
    const [posterList, setPosterList] = useState([]);
    const [hidden, setHidden] = useState(true)
    const [location, setLocation] = useState('')
    const [costArray, setCostArray] = useState([])

    const { locationLat } = useSelector(state => state.list)
    const { locationLot } = useSelector(state => state.list)

    const ticketNumList = [1, 2, 3, 4, 5]

    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
    }

    useEffect(() => {
        dispatch(perfomanceListAction.getPerformanceDetail(id, settingQuery))
    }, [id])

    useEffect(() => {
        // console.log('detailData: ', detailData)
        if (detailData) {
            dispatch(reviewAction.getAllReview({ Id: detailData.mt20id }))

            setPosterList(detailData.styurls)
            setLocation(detailData.mt10id)

            const array = detailData.pcseguidance.split(', ')

            if (array.length > 1) {
                const [name, cost] = array[array.length - 1].split(' ')
                setCostArray(`전석 ${cost}`)
            } else {
                if (detailData.pcseguidance === '전석무료') {
                    setCostArray('전석 0원(무료)')
                } else {
                    setCostArray([detailData.pcseguidance])
                }
            }
        }
    }, [detailData])

    useEffect(() => {
        console.log('costArray:', costArray)
        console.log('review allList', reviewAllList)
    }, [costArray, reviewAllList])

    useEffect(() => {
        dispatch(perfomanceListAction.getLocationLatLot(location, settingQuery))
    }, [location])

    const showDetail = () => {
        setHidden(!hidden)
    }

    const movePage = (detailData) => {
        navigate(`/reservation/${id}`, { state: { cost: costArray } })
    }

    return (
        <Container className="wrap-container">
            {loading ? (
                <div><LoadingText /></div>
            ) : (detailData ? (
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
                                <Row>
                                    <Col lg={4} md={4} sm={4}>장소</Col>
                                    <Col lg={8} md={8} sm={8}>{detailData.fcltynm}</Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>공연기간</Col>
                                    <Col lg={8} md={8} sm={8}>{detailData.prfpdfrom} ~ {detailData.prfpdto}</Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>공연 런타임</Col>
                                    <Col lg={8} md={8} sm={8}>{detailData.prfruntime}</Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>관람 연령</Col>
                                    <Col lg={8} md={8} sm={8}>{detailData.prfage}</Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>가격</Col>
                                    <Col lg={8} md={8} sm={8}>{costArray.length > 1 ? (costArray) : (detailData.pcseguidance)}</Col>
                                </Row>
                            </Row>
                            <Row className="DetailButtonBox">
                                <div className="reservationBtnBox">
                                    <button className="reserveBtn" onClick={() => { movePage(detailData) }}>예매하기</button>
                                </div>
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
                        <li>{detailData.prfcast.length > 1 ? detailData.prfcast : '없음'}</li>
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
                        <div className="locationTitle">
                            <FontAwesomeIcon icon={faLocationDot} size="xl" />
                            <div>
                                {detailData.fcltynm}
                            </div>
                        </div>
                        {
                            locationLat && locationLot ? (<KaKaoMap lat={locationLat} lot={locationLot} />) : null
                        }

                        <div className="subTitle reviewText">리뷰</div>
                        {reviewAllList && reviewAllList.length === 0 ? (
                            <div>아직 리뷰가 없습니다</div>
                        ) : (
                            reviewAllList.map(review => (
                                <div className="review">
                                    <div className="detailReviewTop">
                                        <div className="starName">
                                            <div>{review.starRate}</div>
                                            <div>{review.nickName}</div>
                                        </div>
                                        <div>{convertToKST(review.createdAt)}</div>
                                    </div>
                                    <div>{review.reviewText}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>) : (
                <div><LoadingText /></div>
            )
            )}
            <Star />
        </Container >
    )
}

export default PerformanceDetail