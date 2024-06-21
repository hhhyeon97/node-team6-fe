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
    console.log('userList', userList)
  }, []);

  return(
    <AdminPageLayout>
      <h3>회원관리 페이지</h3>

    </AdminPageLayout>
  );
}

export default AdminUserPage;