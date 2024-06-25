import * as types from '../constants/reservation.constants'

const initialState = {
    loading: false,
    reservationId: null,
    error: null,
    reserveList: [],
}

function reservationReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case types.POST_RESERVATION_REQUEST:
        case types.GET_MY_RESERVATION_REQUEST:
            return { ...state, loading: true }

        case types.POST_RESERVATION_SUCCESS:
            return { ...state, loading: false, reservationId: payload, error: null }
        case types.GET_MY_RESERVATION_SUCCESS:
            return { ...state, loading: false, reserveList: payload }

        case types.POST_RESERVATION_FAIL:
        case types.GET_MY_RESERVATION_FAIL:
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}
export default reservationReducer
