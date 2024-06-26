import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as types from "../../constants/notice.constants";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { noticeAction } from '../../action/noticeAction';
import LinedTitle from '../../component/LinedTitle';
import Pagination from '../../component/Pagination';
import NoticeTable from '../../component/admin_page/NoticeTable';
import NoticeDialog from '../../component/admin_page/NoticeDialog';
import SearchBox from '../../component/SearchBox';
import AlertModal from '../../component/AlertModal';
import "../../style/css/AdminPage.css";

const AdminNoticePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticeList, totalPageNum } = useSelector((state) => state.notice);
  const [query, setQuery] = useSearchParams();
  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    title: query.get("title") || "",
  });
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
    //edit모드로 설정하고
    setMode("edit");
    dispatch({ type: types.SET_SELECTED_NOTICE, payload: notice });
    setShowDialog(true);
  };

  // [ handleNewNotice 열기 ]
  const handleNewNotice = () => {
    setMode("new");
    setShowDialog(true);
  }

  // [ 아이템 삭제하기 ] 
  const deleteItem = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
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

      <Button className="" onClick={handleNewNotice}>
          + 공지사항 작성
      </Button>

      <NoticeTable
          header={tableHeader}
          noticeList={noticeList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

      <NoticeDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setSearchQuery={setSearchQuery}
      />

      <Pagination 
        totalPageNum={totalPageNum}
        forcePage={searchQuery.page-1}
        onPageChange={onPageChange}
      />

      <AlertModal 
        showModal={showModal}
        setShowModal={setShowModal}
        selectedId={selectedId}
        selectedName={selectedName}
        alertMessage="해당 공지사항을 정말로 삭제하시겠습니까?"
        btnText="공지삭제"
      />

    </div>
  );
}

export default AdminNoticePage;