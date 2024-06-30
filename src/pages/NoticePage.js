import React, { useEffect, useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import '../style/css/NoticePage.css';
import Pagination from '../component/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { noticeAction } from '../action/noticeAction';
import { convertToKST } from '../utils/Date';
import {
  faPaperclip,
  faStar,
  faThumbTack,
  faUser,
  faUserCheck,
  faUserCircle,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingText from '../component/LoadingText';
import { faWaze } from '@fortawesome/free-brands-svg-icons';

const NoticePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { noticeList, totalPageNum, loading } = useSelector(
    (state) => state.notice,
  );
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
  });
  const [activeKey, setActiveKey] = useState(null);

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

    // 페이지가 바뀔 때마다 아코디언 초기화
    setActiveKey(null);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  // const breakTextOnDot = (text) => {
  //   const parts = text.split('.');
  //   return parts.map((part, index) => (
  //     <span key={index}>
  //       {part}
  //       {index !== parts.length - 1 && '.'}
  //       {index !== parts.length - 1 && <br />}
  //     </span>
  //   ));
  // };

  if (loading) {
    <LoadingText />;
  }

  if (noticeList.length === 0) {
    return (
      <div className="no_list_message">
        <h2>공지사항을 준비중입니다.</h2>
      </div>
    );
  }

  return (
    <Container className="notice_page_area d-flex justify-content-center align-items-center">
      <div className="notice_content_area">
        <h2 className="notice_top_title">공지사항</h2>

        {/* <Accordion defaultActiveKey="0" className="notice_accordion"> */}
        {/* <Accordion className="notice_accordion"> */}
        <Accordion
          activeKey={activeKey}
          onSelect={(e) => setActiveKey(e)}
          className="notice_accordion"
        >
          {noticeList.map((notice, idx) => (
            // <Card key={notice._id} className="notice_card">
            <Card
              key={notice._id}
              className={`notice_card ${notice.isImportant ? 'important' : ''}`}
            >
              <Accordion.Item eventKey={idx.toString()}>
                <Accordion.Header className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="notice_id">
                      {notice.isImportant ? (
                        <FontAwesomeIcon
                          className="thumb_icon"
                          icon={faThumbTack}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          className="clip_icon"
                          icon={faPaperclip}
                        />
                      )}
                    </span>
                    <span className="notice_title_wrap">
                      {notice.isImportant ? '[공지]' : '[일반]'} {notice.title}
                    </span>
                  </div>
                  <span className="notice_date">
                    {convertToKST(notice.createdAt)}
                  </span>
                </Accordion.Header>
                <Accordion.Body className="desc_wrap">
                  <div className="author_wrap">
                    <FontAwesomeIcon
                      icon={faWaze}
                      className="author_icon"
                    ></FontAwesomeIcon>{' '}
                    작성자 :{' '}
                    {notice.userId.level === 'admin'
                      ? 'Noona Culture 관리자'
                      : ''}
                  </div>
                  <br />
                  <div className="notice_img_wrap">
                    {notice.img && <img src={notice.img} alt="공지 이미지" />}
                  </div>
                  <div className="notice_content_wrap">{notice.content}</div>
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
