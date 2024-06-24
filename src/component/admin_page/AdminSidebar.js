import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPencil, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../action/userAction";
import UserProfile from '../UserProfile';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // [ 유저 정보 받아오기 ]
  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  return (
    <div className='admin_sidebar'>
      <UserProfile user={user}/>
      <ul className='link_menu'>
        <li>
          <Link to="/admin/user">
            <FontAwesomeIcon icon={faUser} />
            <div>회원관리</div>
          </Link>
        </li>
        <li>
          <Link to="/admin/review">
            <FontAwesomeIcon icon={faPencil} /> 
            <div>리뷰관리</div>
          </Link>
        </li>
        <li>
          <Link to="/admin/notice">
            <FontAwesomeIcon icon={faBullhorn} /> 
            <div>공지사항관리</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;