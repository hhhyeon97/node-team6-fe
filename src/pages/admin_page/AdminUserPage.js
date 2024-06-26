import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import * as types from "../../constants/user.constants";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';
import LinedTitle from '../../component/LinedTitle';
import Pagination from '../../component/Pagination';
import UserTable from '../../component/admin_page/UserTable';
import UserDetailDialog from '../../component/admin_page/UserDetailDialog';
import SearchBox from '../../component/SearchBox';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, totalPageNum } = useSelector((state) => state.user);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [open, setOpen] = useState(false);
  const tableHeader = [
    "회원명",
    "회원등급",
    "이메일",
    "전화번호",
    "가입일자",
  ];

  // [ userList 가져오기 ]
  useEffect(() => {
    dispatch(userActions.getUserList({ ...searchQuery }));
  }, [query, dispatch]);

  // [ 검색어나 페이지가 바뀌면 url바꿔주기 ]
  useEffect(() => {
    if(searchQuery === ""){
      delete searchQuery.name;
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

  // [ 회원 정보 수정 form 열기 ]
  const openEditForm = (user) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_USER, payload: user });
  };

  // [ UserDetailDialog 닫기 ]
  const handleClose = () => {
    setOpen(false);
  };

  return(
      <div className="admin_user_container admin_page">
        <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="회원명으로 검색해주세요"
            field="name"
        />
        <div class="reset_btn_area">
          <Button className='search_reset' onClick={resetSearch} variant="light">
            검색 초기화
          </Button>
        </div>

        <LinedTitle title='회원관리' cap='회원 정보를 조회하고 회원등급을 수정할 수 있습니다'/>

        <UserTable
          header={tableHeader}
          userList={userList}
          openEditForm={openEditForm}
        />

        <Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />

      { open && <UserDetailDialog open={open} handleClose={handleClose} setSearchQuery={setSearchQuery} />}
      </div>
  );
}

export default AdminUserPage;