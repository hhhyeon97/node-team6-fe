import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AdminPageLayout from '../../Layout/AdminPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.getUserList());
  }, [dispatch]);
  console.log("userList", userList)
  return(
    <AdminPageLayout>
      <h3>회원관리 페이지</h3>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </AdminPageLayout>
  );
}

export default AdminUserPage;