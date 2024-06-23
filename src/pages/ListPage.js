import React, { useEffect, useState } from "react";
import ListItem from "../component/ListItem";
import CalenderBox from '../component/CalenderBox';
import { Dateformat } from '../utils/Date'
import { Row, Col, Container } from "react-bootstrap";
import '../style/css/ListPage.css'
import { useDispatch, useSelector } from "react-redux";
import { perfomanceListAction } from "../action/perfomanceListAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faCaretUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const ListPage = () => {
    const dispatch = useDispatch();

    const [selectDate, setSelectDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [performanceListData, setPerformanceListData] = useState([])
    const [errorMsg, setErrorMsg] = useState()
    const [sort, setSort] = useState('date')
    const [view, setView] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('')

    useEffect(() => {
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg, selectDate })
    }, [selectDate])

    useEffect(() => {
        console.log("receive performanceListData: ", performanceListData)
    }, [performanceListData])

    useEffect(() => { }, [selectDate])


    const backToday = () => {
        setSelectDate(new Date())
    }

    const handleStatus = async (status) => {
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg, selectDate, selectedRegion, status })
    }

    const hadleSort = (sort) => {
        if (sort === 'local') {
            setSort('local')
            setSelectDate(new Date())
        } else if (sort === 'date') {
            setSort('date')
            setSelectedRegion('')
        }
    }

    const localList = [
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

    const RegionParam = (local) => {
        setSelectedRegion(local)
    }

    useEffect(() => {
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg, selectDate, selectedRegion })
    }, [selectedRegion])

    return (
        <Container className="wrap-container">
            <Row className="ListPageTitle">
                <h1>공연</h1>
                <div>Noona Culture로 가장 빠르게 알아보는 컬쳐소식</div>
            </Row>
            <Row className="ListPageMainBox">
                <Row className="sort_topButtons">
                    <Col className="statusButtons">
                        <div className="status_run" onClick={() => { handleStatus('02') }}>공연중</div>
                        <div className="status_yet" onClick={() => { handleStatus('01') }}>공연예정</div>
                        <div className="status_over" onClick={() => { handleStatus('03') }}>공연완료</div>
                    </Col>
                    <Col className="sortButtons">
                        <div onClick={() => hadleSort('date')}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <div>캘린더</div>
                        </div>
                        <div onClick={() => hadleSort('local')}>
                            <FontAwesomeIcon icon={faMap} />
                            <div>지역별</div>
                        </div>
                    </Col>
                </Row>

                <Col lg={7} md={7} sm={6} className="ListItemsBox">
                    {loading ? <p>공연 리스트를 불러오는 중입니다...</p> :
                        (Array.isArray(performanceListData) && performanceListData.length > 0 ? (
                            performanceListData.map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))
                        ) : (
                            <p>공연정보가 없습니다.</p>
                        ))
                    }
                </Col>

                {sort === 'date' ? (
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
                ) : (
                    <Col lg={5} md={5} sm={6} className="LegionDropContainer">
                        <ul onClick={() => { setView(!view) }} className="regionDrop">
                            지역{selectedRegion ? ' : ' + selectedRegion.name : ''}
                            {view ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                            {view && <Dropdown />}
                        </ul>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default ListPage