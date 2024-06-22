import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AdminPageLayout from '../../Layout/AdminPageLayout';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../../action/userAction';
import LinedTitle from '../../component/LinedTitle';

const AdminReviewPage = () => {
  const dispatch = useDispatch();
  // const { userList } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(userActions.getUserList());
  // }, [dispatch]);
  // console.log("userList", userList)

  return(
    <AdminPageLayout>
      <LinedTitle title='리뷰관리' cap='회원들이 남긴 리뷰를 조회하고 리뷰의 상태를 수정할 수 있습니다'/>
      <ul>
        {/* {userList.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))} */}
      </ul>
    </AdminPageLayout>
  );
}

export default AdminReviewPage;