import * as types from '../constants/reservation.constants'

const initialState = {
    loading: false,
    reservationId: null,
    error: null,
    reserveList: [],
    totalPageNum: 1,
    selectedReserve: null,
}

function reservationReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case types.POST_RESERVATION_REQUEST:
        case types.GET_MY_RESERVATION_REQUEST:
        case types.GET_MY_RESERVE_DETAIL_REQUEST:
        case types.CANCEL_RESERVATION_REQUEST:
            return { ...state, loading: true }

        case types.POST_RESERVATION_SUCCESS:
            return { ...state, loading: false, reservationId: payload, error: null }
        case types.GET_MY_RESERVATION_SUCCESS:
            return { ...state, loading: false, 
                    reserveList: payload.data, 
                    totalPageNum: payload.totalPageNum,
                    error: null }
        case types.GET_MY_RESERVE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null,
                    selectedReserve: payload.data}
        case types.CANCEL_RESERVATION_SUCCESS:
            return { ...state, loading: false, 
                reserveList: payload.data }
        case types.POST_RESERVATION_FAIL:
        case types.GET_MY_RESERVATION_FAIL:
        case types.GET_MY_RESERVE_DETAIL_FAIL:
        case types.CANCEL_RESERVATION_FAIL:
            return { ...state, loading: false, error: payload }
        case types.SET_SELECTED_RESERVATION:
            return { ...state, selectedReserve: payload };
        default:
            return state
    }
}
export default reservationReducer
