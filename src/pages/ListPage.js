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

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const ListPage = () => {
    const dispatch = useDispatch();

    const [selectDate, setSelectDate] = useState(new Date())
    const [view, setView] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('')

    const { loading } = useSelector(state => state.list)
    const { error } = useSelector(state => state.list)

    const [showPage, setShowPage] = useState(1)
    const [status, setStatus] = useState('02')

    const [query] = useSearchParams();
    const categoryQurery = query.get('category') || ''

    const settingQuery = {
        service: REACT_APP_YEJIN_SERVICE_KEY,
        rows: 10,
        signgucode: selectedRegion ? selectedRegion.code : '',
        prfstate: status,
    }

    useEffect(() => {
        dispatch(perfomanceListAction.getPerformanceList({
            stdate: StringDateformat(selectDate),
            shcate: categoryQurery,
            eddate: EndDateformat(selectDate),
            cpage: showPage
        }, settingQuery))
        console.log("receive PerformanceListData: ", PerformanceListData)
    }, [selectDate, status, selectedRegion, categoryQurery])

    const { PerformanceListData } = useSelector(state => state.list)

    const backToday = () => {
        setSelectDate(new Date())
    }

    const handleStatus = async (status) => {
        setStatus(status)
    }

    // const hadleSort = (sort) => {
    //     if (sort === 'local') {
    //         setSort('local')
    //         setSelectDate(new Date())
    //     } else if (sort === 'date') {
    //         setSort('date')
    //         setSelectedRegion('')
    //     }
    // }

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

    return (
        <Container className="wrap-container">
            <Row className="ListPageTitle">
                <Col>
                    <h1>공연</h1>
                    <div>Noona Culture로 가장 빠르게 알아보는 컬쳐소식</div>
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
                    {/* <Col className="sortButtons">
                        <div onClick={() => hadleSort('date')}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <div>캘린더</div>
                        </div>
                        <div onClick={() => hadleSort('local')}>
                            <FontAwesomeIcon icon={faMap} />
                            <div>지역별</div>
                        </div>
                    </Col> */}
                </Row>

                <Col lg={7} md={7} sm={6} className="ListItemsBox">
                    {loading ? <p>공연 리스트를 불러오는 중입니다...</p> :
                        (Array.isArray(PerformanceListData) && PerformanceListData.length > 0 ? (
                            PerformanceListData.map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))
                        ) : (
                            <p>공연정보가 없습니다.</p>
                        ))
                    }
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