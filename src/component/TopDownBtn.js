import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../style/css/TopDownBtn.css'

const TopDownBtn = () => {
    const [btnShow, setBtnShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setBtnShow(true);
            } else {
                setBtnShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    const moveTop = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const moveDown = (event) => {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };


    return (
        <div className={`TopDownBtn ${btnShow ? "on" : ""}`}>
            <div className="Btn TopButton" onClick={moveTop}>
                <FontAwesomeIcon icon={faChevronUp} />
                {/* <FontAwesomeIcon icon={faCaretUp} /> */}
            </div>
            <div className="Btn DownButton" onClick={moveDown}>
                <FontAwesomeIcon icon={faChevronDown} />
                {/* <FontAwesomeIcon icon={faCaretDown} /> */}
            </div>
        </div>
    );
};

export default TopDownBtn;


