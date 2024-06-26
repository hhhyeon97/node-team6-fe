import * as types from '../constants/like.constants';
import api from '../utils/api';

const addLikeToList = ({seqId,seqImage,seqTo,seqFrom,seqLocation,seqTitle}) => async(dispatch) => {
    try{
        dispatch({type:types.ADD_LIKE_REQUEST});
        const response = await api.post("/like",{
            seqId,seqImage,seqTo,seqFrom,seqLocation,seqTitle
        });
        console.log("추가",response.data.data.items);
        dispatch({type:types.ADD_LIKE_SUCCESS,payload:response.data.data.items});
    }catch(error){
        dispatch({type:types.ADD_LIKE_FAIL,payload:error.error})
    }
}

const deleteLikeItem = ({id}) => async(dispatch) => {
    try{
        dispatch({type:types.DELETE_LIKE_REQUEST});
        const response = await api.delete(`/like/${id}`);
        dispatch({type:types.DELETE_LIKE_SUCCESS,payload:response.data.data.items})
    }catch(error){
        dispatch({type:types.DELETE_LIKE_FAIL,error:error})
    }
}

const getLikeList = () => async(dispatch) => {
    try{
        dispatch({type:types.GET_LIKE_REQUEST});
        const response = await api.get('/like');
        dispatch({type:types.GET_LIKE_SUCCESS,payload:response.data.data})
    }catch(error){
        dispatch({type:types.GET_LIKE_FAIL,error:error})
    }
}

const resetLikeList = () => async(dispatch) => {
    dispatch({type:types.RESET_LIKE});
}

export const likeAction = {
    addLikeToList,
    deleteLikeItem,
    getLikeList,
    resetLikeList,
};