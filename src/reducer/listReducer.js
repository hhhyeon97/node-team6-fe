import * as types from "../constants/performanceList.constants";
import { StringDateformat, EndDateformat } from "../utils/Date";

const initialState = {          // 초기화 값 입력
    loading: false,
    user: null,
    error: "",
    PerformanceListData: [],
    selectDate: '',
    // stdate: StringDateformat(new Date()),
    // eddate: EndDateformat(new Date()),
    // cpage: 1,
    // rows: 10,
    // signgucode: '',
    // prfstate: '02',
    // shcate: '',
    // signgucode: '',
};

function listReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.PERFORMANCELIST_GET_REQUEST:
            return { ...state, loading: true }

        case types.PERFORMANCELIST_GET_SUCCESS:
            return { ...state, loading: false, PerformanceListData: payload }

        case types.PERFORMANCELIST_GET_FAIL:
            return { ...state, loading: false, error: payload }

        default:
            return state
    }

}

export default listReducer