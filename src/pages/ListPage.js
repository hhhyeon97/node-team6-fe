import React, { useEffect, useState } from "react";
import ListItem from "../component/ListItem";
import CalenderBox from '../component/CalenderBox';
import { Dateformat } from '../utils/Date'
import { Row, Col, Container } from "react-bootstrap";
import '../style/css/ListPage.css'
import { perfomanceListAction } from "../action/perfomanceListAction";

const ListPage = () => {
    const [selectDate, setSelectDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [performanceListData, setPerformanceListData] = useState([])
    const [errorMsg, setErrorMsg] = useState()

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
        console.log('status', status)
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg, selectDate, status })
    }

    return (
        <Container className="wrap-container">
            <Row className="ListPageTitle">
                <h1>공연</h1>
                <div>Noona Culture로 가장 빠르게 알아보는 컬쳐소식</div>
            </Row>
            <Row className="ListPageMainBox">
                <Row>
                    <div className="statusButtons">
                        <div className="status_run" onClick={() => { handleStatus('02') }}>공연중</div>
                        <div className="status_yet" onClick={() => { handleStatus('01') }}>공연예정</div>
                        <div className="status_over" onClick={() => { handleStatus('03') }}>공연완료</div>
                    </div>
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