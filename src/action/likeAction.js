import * as types from '../constants/like.constants';
import api from '../utils/api';

const addLikeToList = ({seqId,seqImage,seqTo,seqFrom,seqLocation,seqTitle}) => async(dispatch) => {
    try{
        dispatch({type:types.ADD_LIKE_REQUEST});
        const response = await api.post("/like",{
            seqId,seqImage,seqTo,seqFrom,seqLocation,seqTitle
        });
        console.log("추가",response.data.data.items);
        dispatch({type:types.ADD_LIKE_SUCCESS,payload:response.data.data.items}) 
    }catch(error){
        dispatch({type:types.ADD_LIKE_FAIL,error:error})
    }
}

export const likeAction = {
    addLikeToList,
};