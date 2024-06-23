import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MypageTitle = ({ title, cap }) => {

  return(
      <div className='mypage_title_section'>
        <div className='mypage_title'>
          <h3>{title}</h3>
          <p>{cap}</p>
        </div>
      </div>
  )
}

export default MypageTitle;