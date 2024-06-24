import * as types from "../constants/performanceList.constants";
import { StringDateformat, EndDateformat } from "../utils/Date";

const initialState = {          // 초기화 값 입력
    loading: false,
    user: null,
    error: "",
    PerformanceListData: [],
    PerformanceListDataWithStatus: [],
    RankingList: [],
    selectDate: '',
    detailData: null,
    locationLat: '',
    locationLot: '',
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
        case types.PERFORMANCELISTWITHSTATUS_GET_REQUEST:
        case types.GET_PERFORMANCE_DETAIL_REQUEST:
        case types.GET_LOCATIONLATLOT_REQUEST:
        case types.GET_RANKING_PERFORMANCE_REQUEST:
            return { ...state, loading: true }

        case types.PERFORMANCELIST_GET_SUCCESS:
            return { ...state, loading: false, PerformanceListData: payload }

        case types.PERFORMANCELISTWITHSTATUS_GET_SUCCESS:
            return { ...state, loading: false, PerformanceListDataWithStatus: payload }

        case types.GET_PERFORMANCE_DETAIL_SUCCESS:
            return { ...state, loading: false, detailData: payload }

        case types.GET_LOCATIONLATLOT_DETAIL_SUCCESS:
            return { ...state, loading: false, locationLat: payload.la, locationLot: payload.lo }

        case types.GET_RANKING_PERFORMANCE_SUCCESS:
            return {...state, loading: false, RankingList: payload }
        
        case types.PERFORMANCELIST_GET_FAIL:
        case types.PERFORMANCELISTWITHSTATUS_GET_FAIL:
        case types.GET_PERFORMANCE_DETAIL_FAIL:
        case types.GET_LOCATIONLATLOT_DETAIL_FAIL:
        case types.GET_RANKING_PERFORMANCE_FAIL:
            return { ...state, loading: false, error: payload }

        default:
            return state
    }

}

export default listReducer