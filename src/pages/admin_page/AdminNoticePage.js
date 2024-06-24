import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { noticeAction } from '../../action/noticeAction';
import LinedTitle from '../../component/LinedTitle';
import Pagination from '../../component/Pagination';
import NoticeTable from '../../component/admin_page/NoticeTable';
// import NoticeDetailDialog from '../../component/admin_page/NoticeDetailDialog';
import SearchBox from '../../component/SearchBox';

const AdminNoticePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticeList, totalPageNum } = useSelector((state) => state.notice);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    title: query.get("title") || "",
  });
  const [open, setOpen] = useState(false);
  const tableHeader = [
    "작성자",
    "제목",
    "내용",
    "조회수",
    "등록일자",
  ];

  // [ noticeList 가져오기 ]
  useEffect(() => {
    dispatch(noticeAction.getNoticeList({ ...searchQuery }));
  }, [query, dispatch]);

  console.log('noticeList', noticeList)

  // [ 검색어나 페이지가 바뀌면 url바꿔주기 ]
  useEffect(() => {
    if(searchQuery === ""){
      delete searchQuery.title;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate("?" + query);
  }, [searchQuery]);

  // [ 쿼리에 페이지값 바꿔주기 ]
  const onPageChange = ({ selected }) => {
    setSearchQuery({...searchQuery, page: selected +1});
  };

  // [ 검색 초기화 (All) ]
  const resetSearch = () => {
    setSearchQuery({
      page: 1,
      name: ""
    });
  };

  // [ 공지사항 수정 form 열기 ]
  const openEditForm = (notice) => {
    setOpen(true);
    // dispatch({ type: types.SET_SELECTED_NOTICE, payload: notice });
  };

  // [ UserDetailDialog 닫기 ]
  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div className="admin_notice_container">
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="제목으로 검색해주세요"
        field="title"
      />
      <Button onClick={resetSearch} variant="secondary">검색 초기화</Button>

      <LinedTitle title='공지사항관리' cap='공지사항을 작성하고 관리할 수 있습니다'/>

      <NoticeTable
          header={tableHeader}
          noticeList={noticeList}
          openEditForm={openEditForm}
        />

        <Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />

      {/* { open && <NoticeDetailDialog open={open} handleClose={handleClose} setSearchQuery={setSearchQuery} />} */}
    </div>
  );
}

export default AdminNoticePage;