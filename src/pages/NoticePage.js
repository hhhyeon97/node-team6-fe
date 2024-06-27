import React, { useEffect, useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import '../style/css/NoticePage.css';
import Pagination from '../component/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { noticeAction } from '../action/noticeAction';
import { convertToKST } from '../utils/Date';
import { faStar, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoticePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { noticeList, totalPageNum } = useSelector((state) => state.notice);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
  });

  const PAGE_SIZE = 5;

  // [ noticeList 가져오기 ]
  useEffect(() => {
    dispatch(noticeAction.getUserNoticeList({ ...searchQuery }));
  }, [query, dispatch]);

  // [ 페이지가 바뀌면 url바꿔주기 ]
  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const breakTextOnDot = (text) => {
    const parts = text.split('.');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index !== parts.length - 1 && '.'}
        {index !== parts.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Container className="notice_page_area d-flex justify-content-center align-items-center">
      <div className="notice_content_area">
        <h2 className="notice_top_title">공지사항</h2>

        {/* <Accordion defaultActiveKey="0" className="notice_accordion"> */}
        <Accordion className="notice_accordion">
          <div className="notice_menu_wrap">
            <span className="notice_menu">번호</span>
            <span className="notice_menu">제목</span>
            <span className="notice_menu">등록일</span>
          </div>
          {noticeList.map((notice, idx) => (
            // <Card key={notice._id} className="notice_card">
            <Card
              key={notice._id}
              className={`notice_card ${notice.isImportant ? 'important' : ''}`}
            >
              <Accordion.Item eventKey={idx.toString()}>
                <Accordion.Header className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {/* <span className="notice_id">{'No.' + (idx + 1)}</span> */}
                    <span className="notice_id">
                      {'No.' + ((searchQuery.page - 1) * PAGE_SIZE + (idx + 1))}
                    </span>
                    {/* <span className="notice_title">{notice.title}</span> */}
                    {notice.isImportant && (
                      <FontAwesomeIcon
                        className="star_icon"
                        icon={faThumbTack}
                        style={{ marginRight: '10px' }}
                      ></FontAwesomeIcon>
                    )}
                    {notice.title}
                  </div>
                  <span className="notice_date">
                    {convertToKST(notice.createdAt)}
                  </span>
                </Accordion.Header>
                <Accordion.Body className="desc_wrap">
                  <div>작성자 : {notice.userId.name}</div>
                  <br />
                  {breakTextOnDot(notice.content)}
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>
        <div className="pagination_wrap">
          <Pagination
            totalPageNum={totalPageNum}
            forcePage={searchQuery.page - 1}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default NoticePage;
