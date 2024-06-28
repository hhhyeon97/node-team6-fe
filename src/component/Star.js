import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../style/css/Star.css'

const Star = ({ startNum }) => {
    const totalStart = 5

    return (
        <div>
            {[...Array(Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`filled-star-${index}`} icon={fas.faStar} className="star" />
            ))
            }
            {[...Array(5 - Number(startNum))].map((_, index) => (
                <FontAwesomeIcon key={`empty-star-${index}`} icon={faStar} className="star" />
            ))}
        </div>
    );
};

export default Star;


