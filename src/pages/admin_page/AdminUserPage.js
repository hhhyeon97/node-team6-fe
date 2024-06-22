import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AdminPageLayout from '../../Layout/AdminPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';
import LinedTitle from '../../component/LinedTitle';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.getUserList());
  }, [dispatch]);
  console.log("userList", userList)

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
      </div>
    </AdminPageLayout>
  );
}

export default AdminUserPage;