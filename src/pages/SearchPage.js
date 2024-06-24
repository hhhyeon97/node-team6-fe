import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom';
import { perfomanceListAction } from '../action/perfomanceListAction';
import { EndDateformat, StringDateformat } from '../utils/Date';
import { Container, Row } from 'react-bootstrap';
import SearchCard from '../component/SearchCard';
import '../style/css/SearchPage.css'

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;

const SearchPage = () => {
  const dispatch = useDispatch();
  const [selectDate,setSelectDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState();
  const [status, setStatus] = useState('02');
  const [showPage, setShowPage] = useState(1);
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get('keyword')||'');
  console.log(keyword)
  const settingQuery = {
      service: REACT_APP_YEJIN_SERVICE_KEY,
      rows: 10,
      signgucode: '',
      prfstate: status,
  }

  useEffect(()=>{
      dispatch(perfomanceListAction.getPerformanceList({
          stdate: StringDateformat(selectDate),
          shcate: '',
          eddate: EndDateformat(selectDate),
          cpage: showPage,
          shprfnm: keyword,
      }, settingQuery))
      console.log("서치데이터 ", PerformanceListData)
  },[selectDate,keyword])

  useEffect(()=>{
    setKeyword(query.get('keyword'))
  },[query])

  const { PerformanceListData, loading, error } = useSelector(state => state.list);

  return (
    <Container className='wrap-container search_page'>
      <h3 className='search_page_main_text'>{`'${keyword}'의 검색 결과입니다.`}</h3>
      <Row>
        {loading?(<div>검색 결과를 가져오는 중입니다 ...</div>):(
          PerformanceListData && PerformanceListData.length >0 ?
            PerformanceListData.map((item,index)=>(
              <SearchCard key={index} item={item} />
            )):(<div>검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</div>)
          )
        }  
      </Row>
    </Container>
  )
}

export default SearchPage
