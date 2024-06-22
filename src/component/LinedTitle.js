import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinedTitle = ({ title, cap }) => {

  return(
      <div className='title_section'>
        <div className='title'>
          <h3>{title}</h3>
          <p>{cap}</p>
        </div>
      </div>
  )
}

export default LinedTitle;