import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../style/css/Star.css'

const Star = () => {


    return (
        <div>
            <FontAwesomeIcon icon={faStar} className="star" />
            <FontAwesomeIcon icon={fas.faStar} className="star" />
        </div>
    );
};

export default Star;


