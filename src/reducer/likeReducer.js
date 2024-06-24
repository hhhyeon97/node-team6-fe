import * as types from "../constants/like.constants";

const initialState ={
    loading:false,
    error:null,
    likeList:[],
    likeQty:0
};

function likeReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case types.ADD_LIKE_REQUEST:
            return {...state, loading:true}

        case types.ADD_LIKE_SUCCESS:
            return {...state, loading:false, likeList:payload, likeQty:payload.length};

        case types.ADD_LIKE_FAIL:
            return {...state, loading:false, error:payload};

        default:
            return state;
    }

}

export default likeReducer;