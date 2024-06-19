import React, { useEffect, useState } from "react";
import ListItem from "../component/ListItem";
import CalenderBox from '../component/CalenderBox';
import Dateformat from '../utils/Date'
import { Row, Col, Container } from "react-bootstrap";
import '../style/ListPage.css'
import { perfomanceListAction } from "../action/perfomanceListAction";

const ListPage = () => {
    const [selectDate, setSelectDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [performanceListData, setPerformanceListData] = useState([])
    const [errorMsg, setErrorMsg] = useState()

    useEffect(() => {
        perfomanceListAction.getPerformanceList({ setLoading, setPerformanceListData, setErrorMsg })
    }, [])

    useEffect(() => {
        console.log("receive performanceListData: ", performanceListData)
    }, [performanceListData])

    useEffect(() => { }, [selectDate.toString()])

    return (
        <Container>
            <Row className="ListPageTitle">
                <h1>전시회 공연 리스트!!!</h1>
            </Row>
            <Row>
                <Col lg={7} md={7} sm={6} className="ListItemsBox">
                    {Array.isArray(performanceListData) && performanceListData.length > 0 ? (
                        performanceListData.map((item, index) => (
                            <ListItem key={index} item={item} />
                        ))
                    ) : (
                        <p>공연 리스트를 불러오는 중입니다...</p>
                    )}
                </Col>
                <Col lg={5} md={5} sm={6} className="CalenderBox">
                    <div className="stickyBox">
                        {selectDate ? <div className="selectDate">선택 날짜: {Dateformat(selectDate)} </div> : <div> 날짜를 선택해주세요 </div>}
                        <CalenderBox selectDate={selectDate} setSelectDate={setSelectDate} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ListPage