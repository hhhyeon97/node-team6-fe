import React, { useEffect, useState } from "react";
import ListItem from "../component/ListItem";
import CalenderBox from '../component/CalenderBox';
import { Dateformat, StringDateformat, EndDateformat } from '../utils/Date'
import { Row, Col, Container } from "react-bootstrap";
import '../style/css/ListPage.css'
import { useDispatch, useSelector } from "react-redux";
import { perfomanceListAction } from "../action/perfomanceListAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import LoadingText from "../component/LoadingText";
import Pagination from "../component/Pagination";
import ListPageSkeleton from "./skeletion/ListPageSkeleton";
import notFound from '../assets/img/notFound.png'

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const ListPage = () => {
    const dispatch = useDispatch();

    const [selectDate, setSelectDate] = useState(new Date())
    const [view, setView] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('')
    const [showPagination, setShowPagination] = useState(true)

    const { loading } = useSelector(state => state.list)
    const { error } = useSelector(state => state.list)

    const [query] = useSearchParams();
    const [showPage, setShowPage] = useState(Number(query.get("page")) || 1)
    const [status, setStatus] = useState('02')
    const [totalPageNum, setTotalPageNum] = useState(1)

    const category = query.get('category') || ''
    const categoryName = query.get('categoryName') || ''

    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
        signgucode: selectedRegion ? selectedRegion.code : '',
        prfstate: status,
    }

    // 페이지값 바꿔주기
    const onPageChange = ({ selected }) => {
        setShowPage(selected + 1)
    };


    useEffect(() => {
        dispatch(perfomanceListAction.getPerformanceList({
            stdate: StringDateformat(selectDate),
            shcate: category,
            eddate: EndDateformat(selectDate),
            cpage: showPage,
            rows: 10,
        }, settingQuery))
        console.log("receive PerformanceListData: ", PerformanceListData)
        dispatch(perfomanceListAction.removeDetailData())
    }, [selectDate, status, selectedRegion, category, showPage])

    const { PerformanceListData } = useSelector(state => state.list)

    const backToday = () => {
        setSelectDate(new Date())
    }

    const handleStatus = async (status) => {
        setStatus(status)
    }

    const RegionParam = (local) => {
        setSelectedRegion(local)
    }

    const localList = [
        { name: '전국', code: '' },
        { name: '서울', code: '11' },
        { name: '인천', code: '28' },
        { name: '대전', code: '30' },
        { name: '대구', code: '27' },
        { name: '광주', code: '29' },
        { name: '부산', code: '26' },
        { name: '울산', code: '31' },
        { name: '세종', code: '36' },
        { name: '경기', code: '41' },
        { name: '강원', code: '51' },
        { name: '제주', code: '50' },
        { name: '대학로', code: 'UNI' },
    ]

    function Dropdown() {
        return (
            <div className="liBox">
                {localList.map((local) => (
                    <li onClick={() => { RegionParam(local) }}>{local.name}</li>
                ))}
            </div>
        );
    }

    useEffect(() => {
        if ((!Array.isArray(PerformanceListData) || PerformanceListData.length === 0)) {
            setShowPagination(false);
        } else {
            setShowPagination(true);
        }
    }, [loading, PerformanceListData]);


    return (
        <Container className="wrap-container">
            <Row className="ListPageTitle">
                <Col>
                    <h1>{categoryName}</h1>
                    <div>Noona Culture로 가장 빠르게 알아보는 {categoryName}소식</div>
                </Col>
                <Col lg={5} md={5} sm={6} className="LegionDropContainer">
                    <ul onClick={() => { setView(!view) }} className="regionDrop">
                        지역{selectedRegion ? ' : ' + selectedRegion.name : ' : 전국'}
                        {view ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                        {view && <Dropdown />}
                    </ul>
                </Col>
            </Row>
            <Row className="ListPageMainBox">
                <Row className="sort_topButtons">
                    <Col className="statusButtons">
                        <div className="status_run" onClick={() => { handleStatus('02') }}>공연중</div>
                        <div className="status_yet" onClick={() => { handleStatus('01') }}>공연예정</div>
                        {/* <div className="status_over" onClick={() => { handleStatus('03') }}>공연완료</div> */}
                    </Col>
                </Row>

                <Col lg={7} md={7} sm={6} className="ListItemsBox">
                    {loading ? <ListPageSkeleton /> :
                        (Array.isArray(PerformanceListData) && PerformanceListData.length > 0 ? (
                            PerformanceListData.map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))
                        ) : (
                            <div className="notFound_box">
                                <div className="notFound_inner_box">
                                    <img src={notFound} alt="Not Found" />
                                    <div>공연 정보가 없습니다</div>
                                    <div>다른 조건으로 공연을 찾아보세요</div>
                                </div>
                            </div>
                        ))
                    }

                    <Row className={`ListPagePagination pagination${showPagination.toString()}`}>
                        <Pagination totalPageNum={10} forcePage={showPage - 1} onPageChange={onPageChange} />
                    </Row>
                </Col>

                <Col lg={5} md={5} sm={6} className="CalenderBox">
                    <div className="stickyBox">
                        {selectDate ? <div className="selectDate">선택 날짜: {Dateformat(selectDate)} </div> :
                            <div className="selectDate"> 선택 날짜: {Dateformat(new Date())} </div>}
                        <CalenderBox selectDate={selectDate} setSelectDate={setSelectDate} />
                        <div className="todayBTNBox">
                            <button onClick={() => backToday()} className="todayButton">오늘로</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ListPage