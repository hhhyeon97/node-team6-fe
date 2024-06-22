import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AdminPageLayout from '../../Layout/AdminPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';
import LinedTitle from '../../component/LinedTitle';

const AdminNoticePage = () => {
  const dispatch = useDispatch();
  // const { userList } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(userActions.getUserList());
  // }, [dispatch]);
  // console.log("userList", userList)

  return(
    <AdminPageLayout>
      <LinedTitle title='공지사항관리' cap='공지사항을 작성하고 관리할 수 있습니다'/>
      <ul>
        {/* {userList.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))} */}
      </ul>
    </AdminPageLayout>
  );
}

export default AdminNoticePage;