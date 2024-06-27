import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { likeAction } from "../action/likeAction";
import { fas } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { likeList } = useSelector(state=>state.like);
    const showPerformance = (id) => {
        navigate(`/performance/${id}`)
    }

    const getStatusClassName = () => {
        if (item.prfstate === '공연중') {
            return 'status_run';
        } else if (item.prfstate === '공연예정') {
            return 'status_yet';
        } else if (item.prfstate === '공연완료') {
            return 'status_over';
        }
        // 기본적으로 반환할 클래스가 없는 경우
        return '';
    };

    //찜 기능
    const checkLike = likeList.find(like=>like.seqId === item.mt20id);
    const addLike = (item) =>{
        dispatch(likeAction.addLikeToList({
          seqId:item.mt20id,
          seqImage:item.poster,
          seqTo:item.prfpdto,
          seqFrom:item.prfpdfrom,
          seqLocation:item.fcltynm,
          seqTitle:item.prfnm,
        }))
      }
    const deleteLikeItem = (item) => {
        dispatch(likeAction.deleteLikeItem({id:checkLike._id}))
    }

    return (
        <Row className="ListItem">
            <Col lg={5} md={6} sm={6} className="image_col" onClick={() => showPerformance(item.mt20id)}>
                <img className="posterImg" src={item.poster} alt="포스터 이미지"></img>
            </Col>
            <Col lg={5} md={5} sm={5} className="item_info_box">
                <div onClick={() => showPerformance(item.mt20id)}>{item.prfnm}</div>
                <div>기간: {item.prfpdfrom} ~ {item.prfpdto}</div>
                <div className={`state ${getStatusClassName()}`}>{item.prfstate}</div>
                <div>
                    {checkLike?(<FontAwesomeIcon icon={fas.faHeart} className="like_heart_red" onClick={()=>deleteLikeItem()}/>)
                    :(<FontAwesomeIcon icon={far.faHeart} className="like_heart" onClick={()=>addLike(item)}/>)}  
                </div>
            </Col>
        </Row>
    )

}

export default ListItem