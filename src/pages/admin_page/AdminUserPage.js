import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import AdminPageLayout from '../../Layout/AdminPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';
import LinedTitle from '../../component/LinedTitle';
import Pagination from '../../component/Pagination';
import ReactPaginate from "react-paginate";

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userList, totalPageNum } = useSelector((state) => state.user);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

  // [ userList 가져오기 ]
  useEffect(() => {
    dispatch(userActions.getUserList({ ...searchQuery }));
  }, [query]);

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


  return(
    <AdminPageLayout>
      <div className="admin_user_container">
        <LinedTitle title='회원관리' cap='회원 정보를 조회하고 회원등급을 수정할 수 있습니다'/>
        <ul>
          {userList.map((user) => (
            <li key={user.id} className='user_item'>
              <div>{user.name}</div>
              <div>{user.level}</div>
              <div>{user.email}</div>
              <div>{user.contact}</div>
              <div>{user.createdAt}</div>
            </li>
          ))}
        </ul>

        <Pagination 
          totalPageNum={totalPageNum}
          forcePage={searchQuery.page-1}
          onPageChange={onPageChange}
        />
      </div>
    </AdminPageLayout>
  );
}

export default AdminUserPage;