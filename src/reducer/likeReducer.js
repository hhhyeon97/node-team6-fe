import * as types from "../constants/like.constants";

const initialState ={
    loading:false,
    error:'',
    likeList:[],
    likeQty: 0,
};

function likeReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case types.ADD_LIKE_REQUEST:
        case types.DELETE_LIKE_REQUEST:
        case types.GET_LIKE_REQUEST:
            return {...state, loading:true, error:''}

        case types.ADD_LIKE_SUCCESS:
        case types.DELETE_LIKE_SUCCESS:
        case types.GET_LIKE_SUCCESS:
            return {...state, loading:false, error:'', likeList:payload, likeQty:payload.length};

        case types.ADD_LIKE_FAIL:
        case types.DELETE_LIKE_FAIL:
        case types.GET_LIKE_SUCCESS:
            return {...state, loading:false, error:payload};

        case types.RESET_LIKE:
            return {...state, likeList:[], likeQty:0};
        default:
            return state;
    }

}

export default likeReducer;