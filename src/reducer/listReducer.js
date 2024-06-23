import * as types from "../constants/performanceList.constants";

const initialState = {
    loading: false,
    user: null,
    error: "",
    PerformanceListData: [],
    selectDate: new Date(),
};

function listReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.PERFORMANCELIST_GET_REQUEST:
            return { ...state, loading: false }

        case types.PERFORMANCELIST_GET_SUCCESS:
            return { ...state, loading: false, PerformanceListData: payload.data }

        default:
            return state
    }

}

export default listReducer