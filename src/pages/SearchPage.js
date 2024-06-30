import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { perfomanceListAction } from '../action/perfomanceListAction';
import { EndDateformat, StringDateformat } from '../utils/Date';
import { Container, Row } from 'react-bootstrap';
import SearchCard from '../component/SearchCard';
import '../style/css/SearchPage.css'
import SearchPageSkeleton from './skeletion/SearchPageSkeleton';
import notFound from '../assets/img/notFound.png'

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState();
  const [status, setStatus] = useState('02');
  const [showPage, setShowPage] = useState(1);
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get('keyword') || '');
  console.log(keyword)
  const settingQuery = {
    service: REACT_APP_YEJIN_SERVICE_KEY,
    rows: 10,
    signgucode: '',
    prfstate: status,
  }

  useEffect(() => {
    dispatch(perfomanceListAction.getPerformanceList({
      stdate: StringDateformat(selectDate),
      shcate: '',
      eddate: EndDateformat(selectDate),
      cpage: showPage,
      shprfnm: keyword,
    }, settingQuery))
    console.log("서치데이터 ", PerformanceListData)
  }, [selectDate, keyword])

  useEffect(() => {
    setKeyword(query.get('keyword'))
  }, [query])

  const { PerformanceListData, loading, error } = useSelector(state => state.list);

  return (
    <Container className='wrap-container search_page'>
      {PerformanceListData && PerformanceListData.length > 0 ?(<h3 className='search_page_main_text'>{`'${keyword}'의 검색 결과입니다.`}</h3>):''}
      <Row>
        {loading ? (
          <div>
            {[...Array(3)].map((_, index) => (
              <SearchPageSkeleton />
            ))}
          </div>
        ) : (
          PerformanceListData && PerformanceListData.length > 0 ?
            PerformanceListData.map((item, index) => (
              <SearchCard key={index} item={item} />
            )) : (
            <div className='search_none'>
              <div className='search_none_img'>
                <img src={notFound} alt='Not Found' />
              </div>
              <h3>{`"${keyword}"의 검색 결과가 없습니다`}</h3>
              <h4>공연명이 잘못되었거나, 종료된 공연의 경우 검색되지 않을 수 있습니다.</h4>
              <div onClick={()=>navigate('/')}><button>메인으로 돌아가기</button></div>
            </div>
          )
        )}
      </Row>
    </Container>
  )
}

export default SearchPage
