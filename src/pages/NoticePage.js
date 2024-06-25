import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import '../style/css/NoticePage.css';

const NoticePage = () => {
  const notices = [
    {
      id: 1,
      title: '공지사항 1',
      description:
        '공지사항 내용 1입니다. 와 같은 글쓰기 플랫폼을 소개해드리고자 합니다.공통적인 장점에는 이런 것들이 있습니다.글쓰기 플랫폼에서는 쉽게 글을 작성하고 발행할 수 있는 환경을 제공합니다. 또, 글쓰기 플랫폼은 작가들이 자신이 작성한 글을 다른 사람들과 쉽게 공유할 수 있도록 돕습니다.작가들은 자신의 글을 발행한 후에도 플랫폼 내에서 쉽게 수정하거나 삭제할 수 있습니다. 그리고, 자신의 글에 대한 통계 정보를 확인할 수 있어서 글의 성과를 파악할 수 있습니다.',
      date: '2023-06-01',
    },
    {
      id: 2,
      title: '공지사항 2',
      description: '공지사항 내용 2입니다.',
      date: '2023-06-15',
    },
    {
      id: 3,
      title: '공지사항 3',
      description: '공지사항 내용 3입니다.',
      date: '2023-07-01',
    },
    {
      id: 4,
      title: '공지사항 4',
      description: '공지사항 내용 4입니다.',
      date: '2023-06-01',
    },
    {
      id: 5,
      title: '공지사항 5',
      description: '공지사항 내용 5입니다.',
      date: '2023-06-01',
    },
    {
      id: 6,
      title: '공지사항 6',
      description: '공지사항 내용 6입니다.',
      date: '2023-06-01',
    },
    // 추가 공지사항을 여기에 추가
  ];

  const breakTextOnDot = (text) => {
    // 점(.)을 기준으로 문자열을 분리하여 배열로 만듭니다.
    const parts = text.split('.');
    // 분리된 각 요소를 반환합니다.
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index !== parts.length - 1 && '.'}{' '}
        {/* 마지막 요소는 점(.)을 추가하지 않습니다. */}
        {index !== parts.length - 1 && <br />}{' '}
        {/* 마지막 요소는 <br> 태그를 추가하지 않습니다. */}
      </span>
    ));
  };

  return (
    <Container className="notice_page_area d-flex justify-content-center align-items-center">
      <div className="notice_content_area">
        <h2 className="notice_top_title">공지사항</h2>
        <Accordion defaultActiveKey="0" className="notice_accordion">
          {notices.map((notice, idx) => (
            <Card key={notice.id} className="notice_card">
              <Accordion.Item eventKey={idx.toString()}>
                <Accordion.Header className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="notice_id">{notice.id}</span>
                    <span className="notice_title">{notice.title}</span>
                  </div>
                  <span className="notice_date">{notice.date}</span>
                </Accordion.Header>
                <Accordion.Body className="desc_wrap">
                  {breakTextOnDot(notice.description)}{' '}
                  {/* 점(.)을 기준으로 줄바꿈 처리된 내용 */}
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default NoticePage;
