import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { perfomanceListAction } from "../action/perfomanceListAction";
import '../style/css/DetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, fas } from '@fortawesome/free-solid-svg-icons'
import { faHeart, far } from '@fortawesome/free-regular-svg-icons'
import KaKaoMap from "../component/KaKaoMap";
import CopyClipButton from "../component/CopyClipButton";
import { useDispatch, useSelector } from "react-redux";
import LoadingText from "../component/LoadingText"
import { reviewAction } from "../action/reviewAction";
import { convertToKST } from '../utils/Date'

import KakaoClipButton from "../component/KakaoClipButton";
import Star from "../component/Star";
import { likeAction } from "../action/likeAction";

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const PerformanceDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let checkLike = {};
    const { loading } = useSelector(state => state.list)
    const { error } = useSelector(state => state.list)

    const { detailData } = useSelector(state => state.list)
    const { reviewAllList } = useSelector(state => state.review)
    const { likeList } = useSelector(state => state.like);

    const { id } = useParams()

    const [view, setView] = useState(false);
    const [posterList, setPosterList] = useState([]);
    const [hidden, setHidden] = useState(true)
    const [location, setLocation] = useState('')
    const [costArray, setCostArray] = useState([])
    const [checkLike, setCheckLike] = useState(null);

    const { locationLat } = useSelector(state => state.list)
    const { locationLot } = useSelector(state => state.list)

    const [BtnDisabled, setBtnDisabled] = useState(false)
    // const postersBoxRef = useRef(null);
    // const [height, setHeight] = useState(0);

    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
    }

    useEffect(() => {
        dispatch(perfomanceListAction.getPerformanceDetail(id, settingQuery))
    }, [id])

    useEffect(() => {
        console.log('detailData: ', detailData)
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

            if (new Date(detailData.prfpdto) < new Date()) {
                setBtnDisabled(true)
            } else {
                setBtnDisabled(false)
            }
            getcheckList();
        }
    }, [detailData, likeList])

    useEffect(() => {
        dispatch(perfomanceListAction.getLocationLatLot(location, settingQuery))
    }, [location])

    const showDetail = () => {
        setHidden(false)
    }

    const movePage = (detailData) => {
        navigate(`/reservation/${id}`, { state: { cost: costArray } })
    }

    //찜기능

    const getcheckList = () => {
        let checkLike = likeList.find(like => like.seqId == detailData.mt20id);
        setCheckLike(checkLike);
    }

    const addLike = (item) => {
        dispatch(likeAction.addLikeToList({
            seqId: item.mt20id,
            seqImage: item.poster,
            seqTo: item.prfpdto,
            seqFrom: item.prfpdfrom,
            seqLocation: item.fcltynm,
            seqTitle: item.prfnm,
        }))
    }
    const deleteLikeItem = (checkLike) => {
        dispatch(likeAction.deleteLikeItem({ id: checkLike._id }))
    }
    return (
        <Container className="wrap-container">
            {loading ? (
                <div><LoadingText /></div>
            ) : (detailData ? (
                <div className="DetailPageAllBox">
                    <div className={`DetailStatus ${detailData.prfstate.toString() === '공연중' ? 'state_run' : ''}`}>
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
                                {checkLike ? (<FontAwesomeIcon icon={fas.faHeart} className="like_heart_red" onClick={() => deleteLikeItem(checkLike)} />
                                ) : (<FontAwesomeIcon icon={far.faHeart} className="like_heart" onClick={() => addLike(detailData)} />)}
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
                                    <button disabled={BtnDisabled} className={`reserveBtn ${BtnDisabled.toString()}`} onClick={() => { movePage(detailData) }}>예매하기</button>
                                    <div className={`${BtnDisabled.toString()}Color`}>더 이상 예매가 불가한 상품입니다.</div>
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
                            <div className="review_box">
                                <div>등록된 리뷰가 없습니다</div>
                                <div>이 공연의 첫번째 리뷰를 작성해보세요</div>
                            </div>
                        ) : (
                            reviewAllList.map(review => (
                                !review.isSuspended ? (
                                    <div className="review">
                                        <div className="detailReviewTop">
                                            <div className="starName">
                                                <div>
                                                    <Star startNum={review.starRate} />
                                                </div>
                                                <div className="review_nickname">{review.nickName}</div>
                                            </div>
                                            <div>{convertToKST(review.createdAt)}</div>
                                        </div>
                                        <div className="reviewInner">
                                            <div>{review.reviewText}</div>
                                            <div className="userSendImg">
                                                <img src={`${review.image}`} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>아직 리뷰가 없습니다</div>
                                )
                            ))
                        )}
                    </div>
                </div>) : (
                <div><LoadingText /></div>
            )
            )}
        </Container >
    )
}

export default PerformanceDetail