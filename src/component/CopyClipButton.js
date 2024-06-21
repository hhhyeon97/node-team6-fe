import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
// import "./HandleCopyClipBoard.style.css";

const CopyClipButton = ({ detailData }) => {
    const copyURLToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("페이지의 주소가 복사되었습니다.");
        } catch (e) {
            alert("복사에 실패하였습니다");
        }
    };

    return (
        <button
            className="clip-board-copy-button"
            onClick={() =>
                copyURLToClipboard(
                    `http://localhost:3000/performance/${detailData?.mt20id}`
                )
            }
        >
            {" "}
            <FontAwesomeIcon icon={faLink} />
        </button>
    )

}

export default CopyClipButton