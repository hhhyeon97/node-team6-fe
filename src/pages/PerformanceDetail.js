import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { perfomanceListAction } from "../action/perfomanceListAction";

const PerformanceDetail = () => {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [detailData, setDetailData] = useState()
    const { id } = useParams()

    useEffect(() => {
        perfomanceListAction.getPerformanceDetail({ setLoading, setErrorMsg, id, setDetailData })
    }, [])

    useEffect(() => {
        console.log('detailData: ', detailData)
    }, [detailData])

    return (
        <Container>
            <div>id:{id}</div>

        </Container>
    )
}

export default PerformanceDetail