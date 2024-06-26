import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../style/css/Star.css'

const Star = ({ startNum }) => {
    const totalStart = 5

    return (
        <div>
            {[...Array(Number(startNum))].map(num => (
                <FontAwesomeIcon icon={fas.faStar} className="star" />
            ))
            }
            {[...Array(5 - Number(startNum))].map(num => (
                <FontAwesomeIcon icon={faStar} className="star" />
            ))}
        </div>
    );
};

export default Star;


